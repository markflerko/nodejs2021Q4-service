import { logger } from './logger/index';
import config from './common/config';
import app from './app';

process.on('uncaughtException', (error) => {
  logger.error(`captured error: ${error.message}`);
  process.exit(1);
});

app.listen(config.PORT, () => logger.info(`App is running on http://localhost:${config.PORT}`));
