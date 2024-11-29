import dotenv from "dotenv";
import NodePath from "node:path";

import {
  getOsEnvironment,
  getOsEnvironmentOptional,
  normalizePort,
  toNumber,
} from "@lib/env";

import * as packageJson from "@/package.json";

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
    cookieSecret: getOsEnvironment("APP_COOKIE_SIGN_SECRET"),
  },
  swagger: {
    enabled: getOsEnvironmentOptional("SWAGGER_ENABLED"),
    schema:
      getOsEnvironmentOptional("SWAGGER_PUBLIC_APP_SCHEMA") ||
      getOsEnvironment("APP_SCHEMA"),
    hostname:
      getOsEnvironmentOptional("SWAGGER_PUBLIC_APP_HOSTNAME") ||
      getOsEnvironment("APP_HOSTNAME"),
    port:
      getOsEnvironmentOptional("SWAGGER_PUBLIC_APP_PORT") ||
      normalizePort(getOsEnvironment("APP_PORT")),
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
