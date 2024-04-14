import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import * as pkg from '../../package.json';

import { env } from '../env';

const { schema, hostname, port, routePrefix } = env.app; 

const router = express.Router();

const route = `${schema}://${hostname}:${port}${routePrefix}`;
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: pkg.name,
    version: pkg.version,
    description: pkg.description,
  },
  servers: [
    {
      url: route
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerSpec));

export default router;