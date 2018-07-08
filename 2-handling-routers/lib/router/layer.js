'use strict'

class Layer{
    constructor(method, fn){
        this.method = method;
        this.handle = fn;
    }

    canBeHandled(req){
      return this.method.toLowerCase() === req.method.toLowerCase();
    }
    handle_request(req, res, next){
      if (!this.canBeHandled(req)) return;
      const fn = this.handle;
      try {
        fn(req, res, next);
      } catch (err) {
        throw err;
      }
    }

}

module.exports = Layer;