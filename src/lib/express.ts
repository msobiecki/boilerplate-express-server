import http from "node:http";
import { chmodSync } from "node:fs";
import express, { RequestHandler, ErrorRequestHandler } from "express";
import { CronJob, CronOnCompleteCommand } from "cron";

import environment from "@environment";

import terminus from "./terminus";
import { closeSocket } from "./socket-management";

const { hostname, port } = environment.app;

const createExpress = async ({
  middlewares,
  routers,
  crons,
  exceptionHandlers: { notFoundHandler, errorHandler },
  terminusProcesses: overrideTerminusProcesses,
}: {
  middlewares: RequestHandler[];
  routers: [string, RequestHandler][];
  crons?: CronJob<CronOnCompleteCommand, unknown>[];
  exceptionHandlers: {
    notFoundHandler?: RequestHandler;
    errorHandler?: ErrorRequestHandler;
  };
  terminusProcesses?: {
    healthCheckProcesses?: (() => Promise<void>)[];
    beforeShutdownProcesses?: (() => Promise<void>)[];
    onSignalProcesses?: (() => Promise<void>)[];
    onShutdownProcesses?: (() => Promise<void>)[];
  };
}) => {
  const terminusProcesses = {
    healthCheckProcesses: [],
    beforeShutdownProcesses: [],
    onSignalProcesses: [],
    onShutdownProcesses: [],
    ...overrideTerminusProcesses,
  };

  const app = express();

  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  routers.forEach(([route, router]) => {
    app.use(`${environment.app.routePrefix}${route}`, router);
  });

  crons?.forEach((cron) => {
    cron.start();
  });

  if (notFoundHandler) {
    app.all("*splat", notFoundHandler);
  }
  if (errorHandler) {
    app.use(errorHandler);
  }

  const server = http.createServer(app);
  terminus(server, {
    healthCheckProcesses: [...terminusProcesses.healthCheckProcesses],
    beforeShutdownProcesses: [...terminusProcesses.beforeShutdownProcesses],
    onSignalProcesses: [...terminusProcesses.onSignalProcesses],
    onShutdownProcesses: [
      closeSocket,
      ...terminusProcesses.onShutdownProcesses,
    ],
  });

  if (typeof port === "string" && port.endsWith(".sock")) {
    await closeSocket();
    server.listen(port, () => {
      chmodSync(port, 0o770);
    });
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
