import path from "node:path";
import fs from "node:fs";

import environment from "@environment";
import logger from "../logger";

const {
  app: { port },
} = environment;

/**
 * Removes a Unix socket file if it exists, with safety checks.
 */
export function closeSocket(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof port !== "string") {
      throw new TypeError("Invalid socket path. Must be a string.");
    }
    const resolvedPath = path.resolve(port);

    // Check if the socket file exists and remove it if so
    if (fs.existsSync(`${resolvedPath}`)) {
      fs.unlinkSync(resolvedPath);
      logger.info(`Socket file ${resolvedPath} has been removed.`);
    } else {
      logger.info(`Socket file ${resolvedPath} does not exist.`);
    }
    resolve();
  });
}

export default closeSocket;
