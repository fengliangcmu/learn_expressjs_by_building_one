const http = require('http');
const mergeObj = require('merge-descriptors');
const methods = require('methods');
const Layer = require('./router/layer.js')

module.exports = function createServer(){
    const app = function(req, res){
        res.end('Response from server');
    }
    mergeObj(app, proto, false);
    app.init();
    return app;
}

const proto = Object.create(null)
proto.listen = function(port){
    const server = http.createServer(this);
    return server.listen.apply(server, arguments);
}

proto.init = function(){
    this.handles = []; // initialize handles array
}

proto.handle = function (){
    //handle all layers inside handles array
    for (let i = 0; i < this.handles.length; i++) {
        const layer = this.handles[i]
        layer.handle_request(req, res)
      }
}

//let app be able to hand http methods using methods lib
methods.forEach(function(method) {
    proto[method] = function(fn) {
      const layer = new Layer(method, fn)
      this.handles.push(layer)
    }
  })