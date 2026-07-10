'use strict';

const { GraphQLError } = require('graphql');
const userService = require('../../services/userService');

function requireAuth(context) {
  if (!context.user) {
    throw new GraphQLError('You must be logged in to perform this action.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return context.user;
}

const userQueries = {
  users: async () => userService.getUsers(),

  user: async (_, { id }) => userService.getUserById(id),
};

const userMutations = {
  // Public — no requireAuth
  register: async (_, { name, email, password, role }) => {
    return userService.registerUser({ name, email, password, role });
  },

  // Public — no requireAuth
  login: async (_, { email, password }) => {
    return userService.loginUser({ email, password });
  },

  updateSellerProfile: async (_, { id, name, email, phone, bio }, context) => {
    requireAuth(context);
    return userService.updateSellerProfile(id, { name, email, phone, bio });
  },
};

module.exports = { userQueries, userMutations };
