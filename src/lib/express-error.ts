import { taggedLogger } from "./logger";

const logger = taggedLogger("server");

const expressError = (error: Error) =>
  logger.error({ error }, "Server is crashed");

export default expressError;
