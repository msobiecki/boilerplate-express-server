import cluster from "node:cluster";
import os from "node:os";

import { taggedLogger } from "./lib/logger";
import environment from "./environment";

const logger = taggedLogger("cluster");

const numberOfCPUs = os.availableParallelism();

const { numberOfInstances } = environment.cluster;

const numberOfWorkers = numberOfInstances || numberOfCPUs;

if (cluster.isPrimary) {
  logger.info(
    `Primary cluster process is running. Preparing ${numberOfWorkers} ${numberOfWorkers > 1 ? "workers" : "worker"}...`,
  );

  const handleSignal = (signal: string) => {
    const workers = cluster.workers && Object.values(cluster.workers);
    if (workers && workers.length > 0) {
      for (const worker of workers) {
        if (worker) {
          worker.send(signal);
        }
      }
    }
  };

  for (let index = 0; index < numberOfWorkers; index += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    const { pid } = worker.process;

    if (code && code !== 0) {
      logger.error(
        `Worker ${pid} exited with error code ${code}. Restarting...`,
      );
      cluster.fork();
    } else {
      logger.info(`Worker ${pid} was killed by signal ${signal}`);
    }
  });

  process.on("SIGTERM", () => handleSignal("SIGTERM"));
  process.on("SIGINT", () => handleSignal("SIGINT"));
} else {
  require("./index");
}
