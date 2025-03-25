import express from "express";

import createEndpoint, {
  RequestMethodEnum as EndpointRequestMethodEnum,
} from "./create-endpoint";
import createMiddleware, {
  RequestMethodEnum as MiddlewareRequestMethodEnum,
} from "./create-middleware";

type EndpointRoute = ReturnType<typeof createEndpoint>;
type MiddlewareRoute = ReturnType<typeof createMiddleware>;

type Routes = (MiddlewareRoute | EndpointRoute)[];

const createRouter = (routes: Routes) => {
  const router = express.Router();

  // eslint-disable-next-line no-restricted-syntax
  for (const route of routes) {
    const { type, method, path, middlewares = [] } = route;
    if (type === "endpoint") {
      const { handler } = route;
      switch (EndpointRequestMethodEnum[`${method}`]) {
        case EndpointRequestMethodEnum.ALL: {
          router.all(path, ...middlewares, handler);
          break;
        }
        case EndpointRequestMethodEnum.GET: {
          router.get(path, ...middlewares, handler);
          break;
        }
        case EndpointRequestMethodEnum.POST: {
          router.post(path, ...middlewares, handler);
          break;
        }
        case EndpointRequestMethodEnum.PUT: {
          router.put(path, ...middlewares, handler);
          break;
        }
        case EndpointRequestMethodEnum.DELETE: {
          router.delete(path, ...middlewares, handler);
          break;
        }
        case EndpointRequestMethodEnum.PATCH: {
          router.patch(path, ...middlewares, handler);
          break;
        }
        case EndpointRequestMethodEnum.OPTIONS: {
          router.options(path, ...middlewares, handler);
          break;
        }
        case EndpointRequestMethodEnum.HEAD: {
          router.head(path, ...middlewares, handler);
          break;
        }
        default: {
          throw new Error(`Invalid HTTP method: ${method} for path: ${path}`);
        }
      }
    }

    if (type === "middleware") {
      switch (MiddlewareRequestMethodEnum[`${method}`]) {
        case MiddlewareRequestMethodEnum.USE: {
          if (path) {
            router.use(path, ...middlewares);
          } else {
            router.use(...middlewares);
          }
          break;
        }
        default: {
          throw new Error("Invalid middleware method");
        }
      }
    }
  }

  return router;
};

export default createRouter;
