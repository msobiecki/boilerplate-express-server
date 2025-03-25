import { RequestHandler } from "express";

export enum RequestMethodEnum {
  "ALL",
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "OPTIONS",
  "HEAD",
}

type RequestMethod = keyof typeof RequestMethodEnum;

type Endpoint = {
  path: string;
  method: RequestMethod;
  middlewares?: (RequestHandler | RequestHandler[])[];
  handler: RequestHandler;
};

const createEndpoint = ({ path, method, middlewares, handler }: Endpoint) => {
  return { type: "endpoint" as const, method, path, middlewares, handler };
};

export default createEndpoint;
