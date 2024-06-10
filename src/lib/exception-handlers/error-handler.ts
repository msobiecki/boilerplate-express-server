import { Request, Response } from "express";
import httpStatus from "http-status";

const { INTERNAL_SERVER_ERROR } = httpStatus;

const code = httpStatus[`${INTERNAL_SERVER_ERROR}`];
const name = httpStatus[`${INTERNAL_SERVER_ERROR}_NAME`];
const message = httpStatus[`${INTERNAL_SERVER_ERROR}_MESSAGE`];

/**
 * Handles errors that occur during request processing.
 * @param error - The error object that was thrown.
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
function errorHandler(error: Error, request: Request, response: Response) {
  const { ip, method, originalUrl: url } = request;

  request.log
    .child({ tag: "exception-routes-error" })
    .error(`${ip} [${method}] ${url} ${code} - ${error.message ?? message}`);
  response.status(INTERNAL_SERVER_ERROR).json({
    code,
    name,
    message,
  });
}

export default errorHandler;
