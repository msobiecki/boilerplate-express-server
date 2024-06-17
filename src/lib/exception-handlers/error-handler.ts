import { NextFunction, Request, Response } from "express";

import getResponseStatusCode, {
  INTERNAL_SERVER_ERROR,
} from "../../utils/get-response-status-code";

const { code, name, message } = getResponseStatusCode(INTERNAL_SERVER_ERROR);

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

  request.log
    .child({ tag: "exception-routes-error" })
    .error(
      { error },
      `${ip} [${method}] ${url} ${code} - ${error.message ?? message}`,
    );
  response.status(INTERNAL_SERVER_ERROR).json({
    code,
    name,
    message,
  });
}

export default errorHandler;
