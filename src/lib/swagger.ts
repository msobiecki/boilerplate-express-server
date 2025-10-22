import { Router, Request, Response, NextFunction } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { setup, serve } from "swagger-ui-express";

import environment from "@environment";

import * as packageJson from "@/package.json";

const {
  swagger: { enabled, schema, hostname, port },
  app: { routePrefix },
} = environment;

const route = `${schema}://${hostname}${port ? `:${port}` : ""}${routePrefix}`;
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
  },
  servers: [
    {
      url: route,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const router = Router();

if (enabled) {
  router.use(
    "/",
    (_request: Request, response: Response, next: NextFunction) => {
      response.setHeader("Content-Security-Policy", `script-src 'self'`);
      next();
    },
    serve,
    setup(swaggerSpec),
  );
}

export default router;
