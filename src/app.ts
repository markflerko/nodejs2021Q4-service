import http from 'http';
import requestListener from './requestListener';

import { logger } from './logger/index';

const app = http.createServer(requestListener);

process.on('uncaughtException', (error) => {
  logger.error(`captured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: { message: string }) => {
  logger.error(`Unhandled rejection detected: ${reason.message}`);
});

export default app;
