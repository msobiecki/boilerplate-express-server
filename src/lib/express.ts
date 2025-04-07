import http from "node:http";
import express, { RequestHandler, ErrorRequestHandler } from "express";
import { CronJob, CronOnCompleteCommand } from "cron";

import environment from "@environment";

import terminus from "./terminus";
import { closeSocket } from "./socket-management";

const { hostname, port } = environment.app;

const createExpress = async ({
  middlewares,
  routers,
  crons = [],
  exceptionHandlers: { notFoundHandler, errorHandler },
}: {
  middlewares: RequestHandler[];
  routers: [string, RequestHandler][];
  crons?: CronJob<CronOnCompleteCommand, unknown>[];
  exceptionHandlers: {
    notFoundHandler: RequestHandler;
    errorHandler: ErrorRequestHandler;
  };
}) => {
  const app = express();

  for (const middleware of middlewares) {
    app.use(middleware);
  }

  for (const [route, router] of routers) {
    app.use(`${environment.app.routePrefix}${route}`, router);
  }

  for (const cron of crons) {
    cron.start();
  }

  app.all("*splat", notFoundHandler);
  app.use(errorHandler);

  const server = http.createServer(app);
  terminus(server);

  if (typeof port === "string" && port.endsWith(".sock")) {
    await closeSocket();
    server.listen(port);
  } else if (typeof port === "number") {
    server.listen(port, hostname);
  } else {
    throw new TypeError(
      "Invalid port. Must be a number or a string ending with '.sock'.",
    );
  }

  return { app, server };
};

export default createExpress;
