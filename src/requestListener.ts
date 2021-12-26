/* eslint-disable no-unreachable */
import { IncomingMessage, ServerResponse } from 'http';
import { finished } from 'stream';
import queryString from 'query-string';

import responseBuilder from './utils/responseBuilder';
import './routes/users';
import './routes/boards';
import './routes/tasks';

import emitter from './utils/eventEmitter';
import { logger } from './logger';

/**
 * requestListener function that will invoke on every request on server and defy it behavior
 * @param req request stream from client
 * @param res response stream that send to client as a result of request handling
 */
export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const start = Date.now();
    const { method, url } = req;

    const parsed = queryString.parseUrl(`http://localhost:4000${url}`);

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

    finished(res, () => {
      // npm package on-finished
      const ms = Date.now() - start;
      const { statusCode } = res;
      logger.verbose(
        // @ts-ignore
        `url: ${url}, body: ${req.body}, params: ${JSON.stringify(
          parsed.query
        )}, method: ${method}, statusCode: ${statusCode}, [${ms}ms]`
      );
    });
  } catch (error) {
    logger.error(error);
    responseBuilder({
      res,
      code: 500,
      message: 'Sorry, internal server error has occured',
    });
  }
};
