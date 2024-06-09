import http from "node:http";
import express, { Express, RequestHandler } from "express";

import environment from "../environment";

import terminus from "./terminus";

const { hostname, port } = environment.app;

const createExpress = ({
  middlewares,
  routers,
}: {
  middlewares: RequestHandler[];
  routers: [string, RequestHandler][];
}) => {
  const app: Express = express();

  for (const middleware of middlewares) {
    app.use(middleware);
  }

  for (const [route, router] of routers) {
    app.use(`${environment.app.routePrefix}${route}`, router);
  }

  const server = http.createServer(app);
  terminus(server);
  server.listen(port, hostname);

  return Promise.resolve();
};

export default createExpress;
