import { Request, Response } from "express";

import { OK } from "@utils/get-response-status-code";

import environment from "@environment";

const { name, version, description } = environment.app;

const root = (request: Request, response: Response) => {
  response.status(OK).json({
    name,
    version,
    description,
  });
};

export default root;
