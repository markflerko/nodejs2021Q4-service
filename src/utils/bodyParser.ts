import { IncomingMessage } from 'http';

export const bodyParser = (req: IncomingMessage & { body: '' }) =>
  new Promise<void>((res, rej) => {
    let chunks = '';

    req.on('error', (err: Error) => {
      console.error('error happened while body parsing', err);
      rej();
    });

    req.on('data', (chunk: string) => {
      chunks += chunk;
    });

    req.on('end', () => {
      req.body = JSON.parse(chunks);
      res();
    });
  });
