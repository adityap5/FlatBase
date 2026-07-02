'use strict';

/**
 * src/graphql/resolvers/flatResolvers.js
 * Query and Mutation resolvers for the Flat type.
 * All DB logic delegated to flatService.
 */

const { GraphQLError } = require('graphql');
const flatService = require('../../services/flatService');

function requireAuth(context) {
  if (!context.user) {
    throw new GraphQLError('You must be logged in to perform this action.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return context.user;
}

const flatQueries = {
  flats: async () => flatService.getFlats(),

  flat: async (_, { id }) => flatService.getFlatById(id),

  searchFlats: async (_, { location }) => flatService.searchFlats(location),

  popularFlats: async () => flatService.getPopularFlats(),

  popularCities: async () => flatService.getPopularCities(),
};

const flatMutations = {
  addFlat: async (_, args, context) => {
    requireAuth(context);
    return flatService.addFlat(args);
  },

  updateFlat: async (_, { id, ...update }, context) => {
    requireAuth(context);
    return flatService.updateFlat(id, update);
  },

  deleteFlat: async (_, { id }, context) => {
    requireAuth(context);
    await flatService.deleteFlatById(id);
    return 'Flat deleted successfully';
  },
};

// Field-level resolver: guard against null/undefined price
const flatFieldResolvers = {
  Flat: {
    price: (flat) =>
      flat.price !== null && flat.price !== undefined ? flat.price : 0,
  },
};

module.exports = { flatQueries, flatMutations, flatFieldResolvers };
