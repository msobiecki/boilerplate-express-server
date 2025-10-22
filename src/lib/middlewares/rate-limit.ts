import { rateLimit } from "express-rate-limit";

import { ExceptionError } from "@lib/exception-handlers/error-handler";
import { TOO_MANY_REQUESTS } from "@utils/get-response-status-code";

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  keyGenerator: (request) => {
    let ip =
      request.ip ||
      request.headers["x-forwarded-for"] ||
      request.socket.remoteAddress ||
      "unknown";

    if (Array.isArray(ip)) {
      [ip] = ip;
    }

    if (ip === "unknown") {
      request.log
        .child({ tag: "rate-limit-middleware" })
        .warn("Could not determine client IP");
    }

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
