'use strict';

/**
 * src/graphql/server.js
 * Factory that creates and starts the ApolloServer instance.
 * Separated from server.js so the Apollo setup can be tested in isolation.
 */

const { ApolloServer } = require('@apollo/server');
const typeDefs  = require('./typeDefs/index');
const resolvers = require('./resolvers/index');
const { formatError } = require('../middleware/errorHandler');

/**
 * Creates, starts, and returns a configured ApolloServer instance.
 * Introspection is enabled in non-production environments only.
 */
async function createApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    formatError,
  });

  await server.start();
  return server;
}

module.exports = createApolloServer;
