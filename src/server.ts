import { logger } from './logger/index';
import config from './common/config';
import app from './app';

app.listen(config.PORT, () => logger.info(`App is running on http://localhost:${config.PORT}`));
