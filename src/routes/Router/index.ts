import { IncomingMessage, ServerResponse } from 'http';

/* eslint-disable import/no-import-module-exports */
const emitter1 = require('../../utils/eventEmitter');

export class Router {
  endpoints: any;

  constructor() {
    this.endpoints = {};
  }

  request({ method = 'GET', path, handler }: { method: string; path: string; handler: any }) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }
    const endpoint = this.endpoints[path];
    if (endpoint[method]) {
      throw new Error(`method ${method} on route ${path} is already exist`);
    }
    endpoint[method] = handler;
    emitter1.on(`[${path}]:[${method}]`, (req: IncomingMessage, res: ServerResponse) => {
      handler(req, res);
    });
  }

  get(path: string, handler: any) {
    this.request({ method: 'GET', path, handler });
  }

  post(path: string, handler: any) {
    this.request({ method: 'POST', path, handler });
  }

  put(path: string, handler: any) {
    this.request({ method: 'PUT', path, handler });
  }

  delete(path: string, handler: any) {
    this.request({ method: 'DELETE', path, handler });
  }
}
