'use strict';

/**
 * src/graphql/resolvers/bookingResolvers.js
 * Query and Mutation resolvers for the Booking type.
 * All DB logic delegated to bookingService.
 */

const { GraphQLError } = require('graphql');
const bookingService = require('../../services/bookingService');

function requireAuth(context) {
  if (!context.user) {
    throw new GraphQLError('You must be logged in to perform this action.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return context.user;
}

const bookingQueries = {
  myBookings: async (_, { userId }) => bookingService.getMyBookings(userId),

  booking: async (_, { id }) => bookingService.getBookingById(id),

  sellerBookings: async (_, { sellerId }) =>
    bookingService.getSellerBookings(sellerId),

  sellerAnalytics: async (_, { sellerId }) =>
    bookingService.getSellerAnalytics(sellerId),
};

const bookingMutations = {
  createBooking: async (_, args, context) => {
    requireAuth(context);
    return bookingService.createBooking(args);
  },

  cancelBooking: async (_, { id }, context) => {
    const user = requireAuth(context);
    await bookingService.cancelBooking(id, user._id);
    return 'Booking cancelled successfully';
  },

  deleteBooking: async (_, { id }, context) => {
    requireAuth(context);
    await bookingService.deleteBookingById(id);
    return 'Booking deleted successfully';
  },
};

module.exports = { bookingQueries, bookingMutations };
