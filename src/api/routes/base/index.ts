import { createRouter, createEndpoint } from "@lib/core";

import * as baseController from "@controllers/base";

const router = createRouter([
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
  createEndpoint({
    path: "/",
    method: "GET",
    handler: baseController.root,
  }),
]);

export default router;
