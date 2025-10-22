import NodePath from "node:path";
import { pino, transport, LoggerOptions, DestinationStream } from "pino";

import environment from "@environment";

const { level, path } = environment.log;

const loggerOptions: LoggerOptions = {
  level,
};

const fileTransport = transport({
  target: "pino/file",
  options: {
    messageKey: "message",
    errorKey: "error",
    destination: path && NodePath.join(process.cwd(), path),
    mkdir: true,
  },
}) as DestinationStream;

const stdoutTransport = transport({
  target: "pino-pretty",
  options: {
    colorize: true,
    singleLine: false,
  },
}) as DestinationStream;

const logger = pino(loggerOptions, path ? fileTransport : stdoutTransport);

export const taggedLogger = (tag: string) => logger.child({ tag });

export default logger;
