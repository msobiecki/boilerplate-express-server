import dotenv from "dotenv";

import createExpress from "./lib/express";

import {
  loggerMiddleware,
  metricsMiddleware,
  corsMiddleware,
  requestIpMiddleware,
  rateLimitMiddleware,
  helmetMiddleware,
  cookieMiddleware,
} from "./lib/middlewares";

import swaggerRouter from "./lib/swagger";

import baseRouter from "./api/routes/base";

import { errorHandler, notFoundHandler } from "./lib/exception-handlers";

import banner from "./lib/express-banner";
import error from "./lib/express-error";

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
