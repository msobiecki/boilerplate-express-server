import { Request, Response } from "express";
import httpStatus from "http-status";

const { NOT_FOUND } = httpStatus;

const code = httpStatus[`${NOT_FOUND}`];
const name = httpStatus[`${NOT_FOUND}_NAME`];
const message = httpStatus[`${NOT_FOUND}_MESSAGE`];

/**
 * Handles requests to routes that are not found (404 Not Found).
 * @param request - The HTTP request object.
 * @param response - The HTTP response object.
 */
function notFoundHandler(request: Request, response: Response) {
  response.status(httpStatus.NOT_FOUND).json({
    code,
    name,
    message,
  });
}

export default notFoundHandler;
