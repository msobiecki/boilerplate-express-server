import promBundle from "express-prom-bundle";

const metricsMiddleware = promBundle({
  includeStatusCode: true,
  includeMethod: true,
  includePath: true,
  includeUp: true,
  metricType: "summary",
  promClient: {
    collectDefaultMetrics: {},
  },
});

export default metricsMiddleware;
