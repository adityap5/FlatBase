'use strict';

/**
 * src/graphql/resolvers/reviewResolvers.js
 * Query and Mutation resolvers for the Review type.
 */

const reviewService = require('../../services/reviewService');

const reviewQueries = {
  flatReviews: async (_, { flatId }) => reviewService.getFlatReviews(flatId),
};

const reviewMutations = {
  // Public — users can submit reviews without strict auth for now
  addReview: async (_, args) => reviewService.addReview(args),
};

module.exports = { reviewQueries, reviewMutations };
