import rateLimit from "express-rate-limit";

import getResponseStatusCode, {
  TOO_MANY_REQUESTS,
} from "../../utils/get-response-status-code";

const { code, name, message } = getResponseStatusCode(TOO_MANY_REQUESTS);

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  handler: (request, response) => {
    request.log
      .child({ tag: "rate=limit-middleware" })
      .warn(`${message} from ${request.ip}`);
    response.status(TOO_MANY_REQUESTS).json({
      code,
      name,
      message,
    });
  },
});

export default rateLimitMiddleware;
