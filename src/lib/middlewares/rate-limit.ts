import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

const { TOO_MANY_REQUESTS } = httpStatus;

const code = httpStatus[`${TOO_MANY_REQUESTS}`];
const name = httpStatus[`${TOO_MANY_REQUESTS}_NAME`];
const message = httpStatus[`${TOO_MANY_REQUESTS}_MESSAGE`];

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
