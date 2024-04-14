import http from 'node:http';
import express, { Express, RequestHandler } from 'express';

import { env } from '../env';

import terminus from './terminus';

const { hostname, port } = env.app;

export const createExpress = ({ middlewares, routers } : { middlewares: RequestHandler[]; routers: [string, RequestHandler][]; }) => {
  const app: Express = express();

  middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  routers.forEach(([route, router]) => {
    app.use(`${env.app.routePrefix}${route}`, router);
  });

  const server = http.createServer(app);
  terminus(server);
  server.listen(port, hostname);

  return Promise.resolve();
}
