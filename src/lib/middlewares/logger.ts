import pinoHttp from "pino-http";

import logger from "@lib/logger";

const loggerMiddleware = pinoHttp({
  logger,
  autoLogging: false,
});

export default loggerMiddleware;
