import { taggedLogger } from "./logger";

const logger = taggedLogger("server");

const expressError = (error: Error) =>
  logger.error(
    {
      error: {
        message: error.message,
        name: error.name,
        stack: error.stack,
      },
    },
    "Server is crashed",
  );

export default expressError;
