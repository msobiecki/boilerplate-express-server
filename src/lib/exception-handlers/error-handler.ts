import { NextFunction, Request, Response } from "express";

import getResponseStatusCode, {
  Code,
  INTERNAL_SERVER_ERROR,
} from "@utils/get-response-status-code";

export class ExceptionError extends Error {
  statusCode: Code;

  constructor(message: string, statusCode: Code) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Handles errors that occur during request processing.
 *
 * This middleware function logs the error details, including the client's IP address,
 * the HTTP method, and the requested URL. It then sends a JSON response with an
 * internal server error status and the error information.
 * @param error - The error object that was thrown.
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 * @param _next - The next middleware function (unused).
 */
function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  const { ip, method, originalUrl: url } = request;

  let statusCode: Code = INTERNAL_SERVER_ERROR;
  let responseDetails = getResponseStatusCode(statusCode);
  let issues: unknown;

  if (error instanceof ExceptionError) {
    statusCode = error.statusCode;
    responseDetails = getResponseStatusCode(statusCode);
    responseDetails.message = error.message;
  }

  const { code, message } = responseDetails;

  request.log
    .child({ tag: "exception-routes-error" })
    .error({ error }, `${ip} [${method}] ${url} ${code} - ${message}`);
  response.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    issues,
  });
}

export default errorHandler;
