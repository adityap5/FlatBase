'use strict';

/**
 * src/graphql/resolvers/index.js
 * Merges all domain resolver maps into a single resolvers object
 * consumed by ApolloServer.
 */

const { flatQueries, flatMutations, flatFieldResolvers } = require('./flatResolvers');
const { userQueries, userMutations }                     = require('./userResolvers');
const { bookingQueries, bookingMutations }               = require('./bookingResolvers');
const { reviewQueries, reviewMutations }                 = require('./reviewResolvers');
const { paymentMutations }                               = require('./paymentResolvers');

const resolvers = {
  Query: {
    ...flatQueries,
    ...userQueries,
    ...bookingQueries,
    ...reviewQueries,
  },
  Mutation: {
    ...flatMutations,
    ...userMutations,
    ...bookingMutations,
    ...reviewMutations,
    ...paymentMutations,
  },
  // Field-level resolvers
  ...flatFieldResolvers,
};

module.exports = resolvers;
