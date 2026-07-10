'use strict';

const logger = require('../utils/logger');

function formatError(formattedError, error) {
  logger.error('GraphQL error', {
    message: formattedError.message,
    code: formattedError.extensions?.code,
    path: formattedError.path,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: error?.stack,
    }),
  });

  if (process.env.NODE_ENV === 'production') {
    const { stacktrace, ...safeExtensions } = formattedError.extensions || {};
    return { ...formattedError, extensions: safeExtensions };
  }

  return formattedError;
}

module.exports = { formatError };
