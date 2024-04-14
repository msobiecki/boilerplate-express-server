import { Request, Response } from 'express';
import { OK } from 'http-status';

import * as pkg from '../../../../package.json';

export const root = (req: Request, res: Response) => {
  res.status(OK).json({ name: pkg.name, version: pkg.version, description: pkg.description });
};