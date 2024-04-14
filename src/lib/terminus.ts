import { Server } from 'http';
import { createTerminus, TerminusState } from '@godaddy/terminus';

import { taggedLogger } from './logger';

const logger = taggedLogger('terminus');

function healthCheck ({ state }: { state: TerminusState }) {
  // `state.isShuttingDown` (boolean) shows whether the server is shutting down or not
  return Promise.resolve(
    // optionally include a resolve value to be included as
    // info in the health check response
  )
}

function onSignal () {
  logger.info('Server is starting cleanup');
  return Promise.all([
    // your clean logic, like closing database connections
  ]);
}


function beforeShutdown () {
  logger.info('Server before is starting cleanup');
  return new Promise(resolve => {
    setTimeout(resolve, 5000)
  })
}


function onShutdown () {
  logger.info('cleanup finished, server is shutting down');
  return Promise.all([
    // your cleaned promise logic
  ]);
}

const terminus = (server: Server) => createTerminus(server, {
  healthChecks: {
    '/healthcheck': healthCheck,
  },
  onSignal,
  beforeShutdown,
  onShutdown,
});

export default terminus;