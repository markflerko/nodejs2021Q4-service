const responseBuilder = require('./utils/responseBuilder');
const emitter = require('./utils/eventEmitter');
const router = require('./routes/Router/index');

module.exports = async (req, res) => {
  try {
    const { method, url } = req;
    const pathFull = url.split('/').slice(1);
    const [path] = pathFull;

    if (pathFull.length >= 3) {
      responseBuilder({
        res,
        code: 404,
        message: 'Sorry we have only one layer nest\n',
      });
    } else {
      const emitted = emitter.emit(`[${path}]:[${method}]`, req, res);
      console.log(`[${path}]:[${method}]`);
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
