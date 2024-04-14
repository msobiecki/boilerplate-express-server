import { taggedLogger } from './logger';

const logger = taggedLogger('server');

const error = (error: Error) => logger.error('Server is crashed', error);

export default error;