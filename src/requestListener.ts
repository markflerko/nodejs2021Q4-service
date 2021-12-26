import { IncomingMessage, ServerResponse } from 'http';

import responseBuilder from './utils/responseBuilder';
import './routes/users';
import './routes/boards';
import './routes/tasks';

import emitter from './utils/eventEmitter';

/**
 * requestListener function that will invoke on every request on server and defy it behavior
 * @param req request stream from client
 * @param res response stream that send to client as a result of request handling
 */
export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { method, url } = req;
    if (url) {
      const pathFull = url.split('/').slice(1);
      const [path, pathId, pathIdPath] = pathFull;

      if (pathFull.length >= 3 && pathIdPath !== 'tasks') {
        responseBuilder({
          res,
          code: 404,
          message: 'Sorry here only one layer nest\n',
        });
      } else {
        const route = pathIdPath === 'tasks' ? `${path}/${pathId}/${pathIdPath}` : path;
        const emitted = emitter.emit(`[${route}]:[${method}]`, req, res);
        if (!emitted) {
          responseBuilder({
            res,
            code: 404,
            message: 'no such endpoint\n',
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    responseBuilder({
      res,
      code: 500,
      message: 'Sorry, internal server error has occured',
    });
  }
};
