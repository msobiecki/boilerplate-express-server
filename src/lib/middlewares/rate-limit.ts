import rateLimit from "express-rate-limit";

import { ExceptionError } from "@lib/exception-handlers/error-handler";
import { TOO_MANY_REQUESTS } from "@utils/get-response-status-code";

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  keyGenerator: (request) => {
    const ip = request.ip || request.socket.remoteAddress || "unknown";
    return ip.replace(/:\d+[^:]*$/, "");
  },
  handler: (request, response, next) => {
    request.log
      .child({ tag: "rate-limit-middleware" })
      .warn(`Too many requests from ${request.ip}`);
    next(new ExceptionError("Too many requests", TOO_MANY_REQUESTS));
  },
});

export default rateLimitMiddleware;
