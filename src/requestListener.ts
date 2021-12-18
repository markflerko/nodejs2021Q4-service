import { IncomingMessage, ServerResponse } from 'http';

const responseBuilder = require('./utils/responseBuilder');
const emitter = require('./utils/eventEmitter');
require('./routes/users');
require('./routes/boards');
require('./routes/tasks');

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
        const route =
          pathIdPath === 'tasks' ? `${path}/${pathId}/${pathIdPath}` : path;
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
