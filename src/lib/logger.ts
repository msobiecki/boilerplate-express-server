import { join } from 'node:path';
import pino from 'pino';

import { env } from '../env';

const { level, path } = env.log;

const fileTransport = pino.transport({
  target: 'pino/file',
  options: { 
    messageKey: 'message',
    errorKey: 'error',
    destination: path && join(process.cwd(), path),
    mkdir: true,
  },
});

const stdoutTransport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    singleLine: false,
  },
});

const logger = pino({
  level
}, path ? fileTransport : stdoutTransport );

export const taggedLogger = (tag: string) => logger.child({ tag });

export default logger;

