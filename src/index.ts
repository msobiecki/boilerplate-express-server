import dotenv from "dotenv";

import createExpress from "@lib/express";
import banner from "@lib/express-banner";
import error from "@lib/express-error";
import { errorHandler, notFoundHandler } from "@lib/exception-handlers";

import {
  loggerMiddleware,
  metricsMiddleware,
  corsMiddleware,
  requestIpMiddleware,
  rateLimitMiddleware,
  helmetMiddleware,
  cookieMiddleware,
} from "@lib/middlewares";

import swaggerRouter from "@lib/swagger";
import baseRouter from "@routes/base";

dotenv.config();

createExpress({
  middlewares: [
    loggerMiddleware,
    metricsMiddleware,
    corsMiddleware,
    requestIpMiddleware,
    rateLimitMiddleware,
    helmetMiddleware,
    cookieMiddleware,
  ],
  routers: [
    ["/", swaggerRouter],
    ["/", baseRouter],
  ],
  exceptionHandlers: {
    notFoundHandler,
    errorHandler,
  },
})
  .then(banner)
  .catch(error);
