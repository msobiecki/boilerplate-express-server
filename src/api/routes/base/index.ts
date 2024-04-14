import express, { Request, Response } from 'express';
import { OK } from 'http-status';

import * as pkg from '../../../../package.json';

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the name, version, and description of the API.
 *     tags:
 *       - base
 *     responses:
 *       200:
 *         description: Returns the name, version, and description of the API.
 */
router.get('/', (req: Request, res: Response) => {
  res.status(OK).json({ name: pkg.name, version: pkg.version, description: pkg.description });
});

export default router;
