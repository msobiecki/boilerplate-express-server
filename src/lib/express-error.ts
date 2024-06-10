import { taggedLogger } from "./logger";

const logger = taggedLogger("server");

const expressError = (error: Error) => logger.error("Server is crashed", error);

export default expressError;
