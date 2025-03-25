import { NextFunction, Request, Response } from "express";

import { NOT_FOUND } from "@utils/get-response-status-code";
import { ExceptionError } from "./error-handler";

/**
 * Handles requests to routes that are not found (404 Not Found).
 * @param _request - The HTTP request object (unused).
 * @param _response - The HTTP response object (unused).
 * @param next - The next middleware function.
 */
function notFoundHandler(
  _request: Request,
  _response: Response,
  next: NextFunction,
) {
  next(new ExceptionError("Route not found", NOT_FOUND));
}

export default notFoundHandler;
