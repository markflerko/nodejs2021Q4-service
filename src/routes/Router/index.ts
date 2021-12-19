import { IncomingMessage, ServerResponse } from 'http';

import emitter from '../../utils/eventEmitter';

interface IHandler {
  (req: IncomingMessage, res: ServerResponse): void;
}

export class Router {
  endpoints: Record<string, Record<string, IHandler>>;

  constructor() {
    this.endpoints = {};
  }

  /**
   * assign handler to it method in route
   * @param config.method the method of request to which should be assign handler
   * @param config.path the route that contains method field with it assigned handler
   * @param config.handler function that handle request
   */
  request({ method = 'GET', path, handler }: { method: string; path: string; handler: IHandler }) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpoint = this.endpoints[path];

    if (!endpoint || endpoint[method]) {
      throw new Error(`no such endpoint`);
    }

    endpoint[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req: IncomingMessage, res: ServerResponse) => {
      handler(req, res);
    });
  }

  /**
   * assign handler to "GET" method in route
   * @param path the route that contains method field with it assigned handler
   * @param handler function that handle request
   */
  get(path: string, handler: IHandler) {
    this.request({ method: 'GET', path, handler });
  }

  /**
   * assign handler to "POST" method in route
   * @param path the route that contains method field with it assigned handler
   * @param handler function that handle request
   */
  post(path: string, handler: IHandler) {
    this.request({ method: 'POST', path, handler });
  }

  /**
   * assign handler to "PUT" method in route
   * @param path the route that contains method field with it assigned handler
   * @param handler function that handle request
   */
  put(path: string, handler: IHandler) {
    this.request({ method: 'PUT', path, handler });
  }

  /**
   * assign handler to "DELETE" method in route
   * @param path the route that contains method field with it assigned handler
   * @param handler function that handle request
   */
  delete(path: string, handler: IHandler) {
    this.request({ method: 'DELETE', path, handler });
  }
}
