import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import environment from "@environment";

import * as packageJson from "@/package.json";

const { schema, hostname, port, routePrefix } = environment.app;

const router = express.Router();

const route = `${schema}://${hostname}:${port}${routePrefix}`;
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

router.use("/swagger", swaggerUi.serve);
router.get("/swagger", swaggerUi.setup(swaggerSpec));

export default router;
