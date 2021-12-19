import { IncomingMessage } from 'http';

export const bodyParser = <T>(req: IncomingMessage) =>
  new Promise<T>((res, rej) => {
    let chunks = '';

    req.on('error', (err: Error) => {
      console.error('error happened while body parsing', err);
      rej();
    });

    req.on('data', (chunk: string) => {
      chunks += chunk;
    });

    req.on('end', () => {
      res(JSON.parse(chunks));
    });
  });
