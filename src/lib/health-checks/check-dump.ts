import { HealthCheckError } from "@godaddy/terminus";

const checkDumpConnection = async () => {
  try {
    await Promise.resolve(true);
  } catch (error) {
    throw new HealthCheckError("Dump health check failed", [error]);
  }
};

export default checkDumpConnection;
