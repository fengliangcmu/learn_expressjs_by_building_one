const http = require('http');
const mergeObj = require('merge-descriptors');

const proto = {};
proto.listen = function(port){
    const server = http.createServer(this);
    return server.listen.apply(server, arguments);
}

module.exports = function createServer(){
    const app = function(req, res){
        res.end('Response from server');
    }
    mergeObj(app, proto, false);
    return app;
}