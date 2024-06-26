import environment from "@environment";

import { taggedLogger } from "./logger";

const { schema, hostname, port } = environment.app;

const logger = taggedLogger("server");

const expressBanner = () => {
  const route = `${schema}://${hostname}:${port}`;
  logger.info(`Server is running at ${route}`);
};

export default expressBanner;
