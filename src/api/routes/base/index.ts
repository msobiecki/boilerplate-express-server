import express from "express";

import * as baseController from "../../controllers/base";

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
router.get("/", baseController.default);

export default router;
