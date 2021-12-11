const emitter = require('../../utils/eventEmitter');

class Router {
  constructor() {
    this.endpoints = {};
  }

  request({ method = 'GET', path, handler }) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`method ${method} on route ${path} is already exist`);
    }
    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
    console.log(this.endpoints);
  }

  get(path, handler) {
    this.request({ method: 'GET', path, handler });
  }

  post(path, handler) {
    this.request({ method: 'POST', path, handler });
  }

  put(path, handler) {
    this.request({ method: 'PUT', path, handler });
  }

  delete(path, handler) {
    this.request({ method: 'DELETE', path, handler });
  }
}

module.exports = Router;
