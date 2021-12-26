import { createLogger, format, transports } from 'winston';

// const logFormat = format.printf(({ level, message, timestamp, stack }) => {
//   return `${timestamp} ${level}: ${stack || message}`;
// });

export const logger = createLogger({
  level: 'verbose',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    // logFormat,
    format.cli()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'access.log',
      level: 'verbose',
      format: format.combine(format.uncolorize(), format.json()),
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json()),
    }),
  ],
});

export default logger;
