import { Router } from "express";

import * as baseController from "@controllers/base";

const router = Router();

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
router.get("/", baseController.root);

export default router;
