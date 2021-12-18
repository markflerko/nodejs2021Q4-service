const responseBuilder = require('./utils/responseBuilder');
const emitter = require('./utils/eventEmitter');
require('./routes/users');
require('./routes/boards');
require('./routes/tasks');


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (req: any, res: any) => {
  try {
    const { method, url } = req;
    const pathFull = url.split('/').slice(1);
    const [path, pathId, pathIdPath] = pathFull;

    if (pathFull.length >= 3 && pathIdPath !== 'tasks') {
      responseBuilder({
        res,
        code: 404,
        message: 'Sorry we have only one layer nest\n',
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
  } catch (error) {
    console.log(error);
    responseBuilder({
      res,
      code: 500,
      message: 'Sorry, internal server error has occured',
    });
  }
};
