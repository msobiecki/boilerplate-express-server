import pinoHttp from "pino-http";

import logger from "../logger";

const loggerMiddleware = pinoHttp({
  logger,
  autoLogging: false,
});

export default loggerMiddleware;
