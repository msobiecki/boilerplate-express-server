import { taggedLogger } from "./logger";

import environment from "../environment";

const { schema, hostname, port } = environment.app;

const logger = taggedLogger("server");

const expressBanner = () => {
  const route = `${schema}://${hostname}:${port}`;
  logger.info(`Server is running at ${route}`);
};

export default expressBanner;
