'use strict';

const reviewService = require('../../services/reviewService');

const reviewQueries = {
  flatReviews: async (_, { flatId }) => reviewService.getFlatReviews(flatId),
};

const reviewMutations = {
  addReview: async (_, args) => reviewService.addReview(args),
};

module.exports = { reviewQueries, reviewMutations };
