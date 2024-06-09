import dotenv from "dotenv";
import NodePath from "node:path";

import * as packageJson from "../package.json";
import {
  getOsEnvironment,
  getOsEnvironmentOptional,
  normalizePort,
  toNumber,
} from "./lib/env";

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({
  path: NodePath.join(
    process.cwd(),
    `.env${process.env.NODE_ENV === "test" ? ".test" : ""}`,
  ),
});

/**
 * Environment variables
 */
const environment = {
  node: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
  isDevelopment: process.env.NODE_ENV === "development",
  app: {
    name: getOsEnvironment("APP_NAME"),
    version: packageJson.version,
    description: packageJson.description,
    schema: getOsEnvironment("APP_SCHEMA"),
    hostname: getOsEnvironment("APP_HOSTNAME"),
    port: normalizePort(getOsEnvironment("APP_PORT")),
    routePrefix: getOsEnvironment("APP_ROUTE_PREFIX"),
  },
  cluster: {
    numberOfInstances: toNumber(
      getOsEnvironmentOptional("CLUSTER_NUMBER_OF_INSTANCES"),
    ),
  },
  log: {
    level: getOsEnvironment("LOG_LEVEL"),
    path: getOsEnvironmentOptional("LOG_PATH"),
  },
};

export default environment;
