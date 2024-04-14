import { taggedLogger } from './logger';

import { env } from '../env';

const { schema, hostname, port } = env.app; 

const logger = taggedLogger('server');

const banner = () => {
  const route = `${schema}://${hostname}:${port}`;
  logger.info(`Server is running at ${route}`);
}

export default banner;