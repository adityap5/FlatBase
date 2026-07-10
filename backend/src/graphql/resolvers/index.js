'use strict';

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

  ...flatFieldResolvers,
};

module.exports = resolvers;
