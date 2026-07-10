'use strict';

const { ApolloServer } = require('@apollo/server');
const typeDefs  = require('./typeDefs/index');
const resolvers = require('./resolvers/index');
const { formatError } = require('../middleware/errorHandler');

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
