import dotenv from 'dotenv';
import { join } from 'node:path';

import * as pkg from '../package.json';
import {
    getOsEnv, getOsEnvOptional, getOsPath, getOsPaths, normalizePort, toBool, toNumber
} from './lib/env';

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) });

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        schema: getOsEnv('APP_SCHEMA'),
        hostname: getOsEnv('APP_HOSTNAME'),
        port: normalizePort(getOsEnv('APP_PORT')),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
    },
    cluster: {
      numberOfInstances: toNumber(getOsEnvOptional('CLUSTER_NUMBER_OF_INSTANCES')),
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        path: getOsEnvOptional('LOG_PATH'),
    }
};