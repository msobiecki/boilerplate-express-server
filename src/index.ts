import dotenv from "dotenv";

import createExpress from "./lib/express";

import loggerMiddleware from "./lib/middlewares/logger";
import metricsMiddleware from "./lib/middlewares/metrics";

import baseRouter from "./api/routes/base";
import swaggerRouter from "./lib/swagger";

import banner from "./lib/express-banner";
import error from "./lib/express-error";

dotenv.config();

createExpress({
  middlewares: [loggerMiddleware, metricsMiddleware],
  routers: [
    ["/", swaggerRouter],
    ["/", baseRouter],
  ],
})
  .then(banner)
  .catch(error);
