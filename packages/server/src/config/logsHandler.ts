import { createLogger, format, transports } from 'winston';

const consoleFormat = format.printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}\n`);

const logsHandler = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
  ),
  transports: [
    new transports.Console({ format: format.combine(format.colorize(), consoleFormat) }),
  ],
});

export default logsHandler;
