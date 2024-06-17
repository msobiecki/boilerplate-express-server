import { Request, Response } from "express";

import getResponseStatusCode, {
  NOT_FOUND,
} from "../../utils/get-response-status-code";

const { code, name, message } = getResponseStatusCode(NOT_FOUND);

/**
 * Handles requests to routes that are not found (404 Not Found).
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
function notFoundHandler(request: Request, response: Response) {
  const { ip, method, originalUrl: url } = request;

  request.log
    .child({ tag: "exception-routes-error" })
    .warn(`${ip} [${method}] ${url} ${code} - ${message}`);
  response.status(NOT_FOUND).json({
    code,
    name,
    message,
  });
}

export default notFoundHandler;
