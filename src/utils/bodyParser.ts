import { IncomingMessage } from 'http';
import { logger } from '../logger/index';

/**
 * Parse request in order to get it body as js object and return it
 * @param req request stream from client
 * @returns parsed body as js object if fulfilled or throw error if rejected
 */
export const bodyParser = <T>(req: IncomingMessage) =>
  new Promise<T>((res, rej) => {
    let chunks = '';

    req.on('error', (err: Error) => {
      logger.error('error happened while body parsing', err);
      rej(err);
    });

    req.on('data', (chunk: string) => {
      chunks += chunk;
    });

    req.on('end', () => {
      // @ts-ignore
      req.body = chunks;
      res(JSON.parse(chunks));
    });
  });
