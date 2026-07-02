'use strict';

/**
 * src/middleware/errorHandler.js
 * Apollo Server formatError hook.
 *
 * In production: strips stack traces from error extensions so internal
 * implementation details are never leaked to clients.
 * In development: passes the full error through for easier debugging.
 *
 * Usage: pass as { formatError } to ApolloServer config (see src/graphql/server.js).
 */

const logger = require('../utils/logger');

function formatError(formattedError, error) {
  // Log every server-side error with context
  logger.error('GraphQL error', {
    message: formattedError.message,
    code: formattedError.extensions?.code,
    path: formattedError.path,
    // In dev, include stack; in prod, omit it
    ...(process.env.NODE_ENV !== 'production' && {
      stack: error?.stack,
    }),
  });

  // In production, remove stacktrace from the response
  if (process.env.NODE_ENV === 'production') {
    const { stacktrace, ...safeExtensions } = formattedError.extensions || {};
    return { ...formattedError, extensions: safeExtensions };
  }

  return formattedError;
}

module.exports = { formatError };
