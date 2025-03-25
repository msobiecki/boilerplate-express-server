import { RequestHandler } from "express";

export enum RequestMethodEnum {
  "USE",
}

type RequestMethod = keyof typeof RequestMethodEnum;

type Middleware = {
  path: string;
  middlewares: (RequestHandler | RequestHandler[])[];
};

const createMiddleware = ({ path, middlewares }: Middleware) => {
  return {
    type: "middleware" as const,
    method: "USE" as RequestMethod,
    path,
    middlewares,
  };
};

export default createMiddleware;
