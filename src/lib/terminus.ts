import { Server } from "node:http";
import { createTerminus, TerminusState } from "@godaddy/terminus";

import { taggedLogger } from "./logger";

const logger = taggedLogger("terminus");

/**
 * Performs a health check based on the server's state.
 * @param root - The root object containing the server state.
 * @param root.state - The state of the server.
 * @returns A promise that resolves, optionally with a value to be included in the health check response.
 */
function healthCheck({ state }: { state: TerminusState }) {
  const { isShuttingDown } = state;
  if (isShuttingDown) {
    logger.info("Server is shutting down");
  }
  return Promise
    .resolve
    // optionally include a resolve value to be included as
    // info in the health check response
    ();
}

/**
 * Handles the server signal for cleanup and shutdown.
 *
 * Logs the start of the cleanup process and performs necessary cleanup actions.
 * @returns A promise that resolves when all cleanup logic is completed.
 */
function onSignal() {
  logger.info("Server is starting cleanup");
  return Promise.all([
    // your clean logic, like closing database connections
  ]);
}

/**
 * Executes tasks before the server shutdown.
 *
 * Logs the start of the pre-shutdown cleanup process and waits for a specified time before resolving.
 * @returns A promise that resolves after a 5-second delay.
 */
function beforeShutdown() {
  logger.info("Server before is starting cleanup");
  return new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
}

/**
 * Handles the final cleanup and shutdown of the server.
 *
 * Logs the completion of cleanup and initiates the shutdown process.
 * @returns A promise that resolves when all cleanup logic is completed.
 */
function onShutdown() {
  logger.info("cleanup finished, server is shutting down");
  return Promise.all([
    // your cleaned promise logic
  ]);
}

const terminus = (server: Server) =>
  createTerminus(server, {
    healthChecks: {
      "/healthcheck": healthCheck,
    },
    onSignal,
    beforeShutdown,
    onShutdown,
  });

export default terminus;
