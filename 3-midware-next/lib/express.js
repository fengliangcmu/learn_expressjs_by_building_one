const http = require('http');
const mergeObj = require('merge-descriptors');
const methods = require('methods');
const Layer = require('./router/layer.js');
const Route = require('./router/route.js');
const slice = Array.prototype.slice;

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
    this.route = new Route();
}

proto.handle = function (){
    this.route.dispatch.apply(this.route, slice.call(arguments));
}

//let app be able to hand http methods using methods lib
methods.forEach(function(method) {
    proto[method] = function (fn) {
        this.route[method].apply(this.route, slice.call(arguments));
      }
  })