import { Server } from "node:http";
import {
  createTerminus,
  HealthCheckError,
  TerminusState,
} from "@godaddy/terminus";

import { taggedLogger } from "./logger";

const logger = taggedLogger("terminus");

/**
 * Performs a health check based on the server's state.
 * @param processes - An array of asynchronous functions representing health check processes.
 * @returns A function that performs health checks and throws an error if any check fails.
 */
function healthCheck(processes: (() => Promise<void>)[] = []) {
  return async ({ state }: { state: TerminusState }) => {
    const { isShuttingDown } = state;
    if (isShuttingDown) {
      logger.info("Server is shutting down");
    }

    const errors: Error[] = [];

    await Promise.all(
      processes.map((process) =>
        process().catch((error: Error) => {
          errors.push(error);
        }),
      ),
    );

    if (errors.length > 0) {
      logger.error({ errors }, "Health check failed");
      throw new HealthCheckError("Health check failed", errors);
    }
  };
}

/**
 * Executes tasks before the server shutdown.
 *
 * Logs the start of the pre-shutdown cleanup process and executes provided asynchronous processes.
 * @param processes - An array of asynchronous functions to execute before shutdown.
 * @returns A promise that resolves when all provided processes have completed.
 */
function beforeShutdown(processes: (() => Promise<void>)[] = []) {
  return async () => {
    logger.info("Server is starting pre-shutdown cleanup");
    return Promise.all(processes.map((process) => process()));
  };
}

/**
 * Handles the server signal for cleanup and shutdown.
 *
 * Logs the start of the cleanup process and executes provided asynchronous processes.
 * @param processes - An array of asynchronous functions to execute on signal.
 * @returns A promise that resolves when all provided processes have completed.
 */
function onSignal(processes: (() => Promise<void>)[] = []) {
  return async () => {
    logger.info("Server is starting cleanup");
    return Promise.all(processes.map((process) => process()));
  };
}

/**
 * Handles the final cleanup and shutdown of the server.
 *
 * Logs the completion of the cleanup process and executes provided asynchronous processes.
 * @param processes - An array of asynchronous functions to execute on shutdown.
 * @returns A promise that resolves when all provided processes have completed.
 */
function onShutdown(processes: (() => Promise<void>)[] = []) {
  return async () => {
    logger.info("Cleanup finished, server is shutting down");
    return Promise.all(processes.map((process) => process()));
  };
}

const terminus = (
  server: Server,
  {
    healthCheckProcesses,
    beforeShutdownProcesses,
    onSignalProcesses,
    onShutdownProcesses,
  }: {
    healthCheckProcesses?: (() => Promise<void>)[];
    beforeShutdownProcesses?: (() => Promise<void>)[];
    onSignalProcesses?: (() => Promise<void>)[];
    onShutdownProcesses?: (() => Promise<void>)[];
  },
) =>
  createTerminus(server, {
    healthChecks: {
      "/healthcheck": healthCheck(healthCheckProcesses),
    },
    beforeShutdown: beforeShutdown(beforeShutdownProcesses),
    onSignal: onSignal(onSignalProcesses),
    onShutdown: onShutdown(onShutdownProcesses),
  });

export default terminus;
