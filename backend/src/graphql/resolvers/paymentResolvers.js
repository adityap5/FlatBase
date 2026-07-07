'use strict';

/**
 * src/graphql/resolvers/paymentResolvers.js
 * Razorpay order creation and payment verification resolvers.
 * All SDK and crypto logic delegated to paymentService.
 */

const { GraphQLError } = require('graphql');
const paymentService = require('../../services/paymentService');
const bookingService = require('../../services/bookingService');
const flatService = require('../../services/flatService');

function requireAuth(context) {
  if (!context.user) {
    throw new GraphQLError('You must be logged in to perform this action.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return context.user;
}

const paymentMutations = {
  createOrder: async (_, { amount, currency = 'INR' }, context) => {
    requireAuth(context);
    return paymentService.createOrder(amount, currency);
  },

  verifyPayment: async (
    _,
    { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, startDate, endDate },
    context
  ) => {
    requireAuth(context);

    const isValid = paymentService.verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      // Payment verification failed. Immediately release lock.
      await bookingService.cancelBooking(bookingId, context.user._id);
      throw new GraphQLError('Payment verification failed.', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    // Atomic confirmation and flat update
    const confirmed = await bookingService.confirmPaymentAtomic(bookingId, razorpay_payment_id);
    
    if (!confirmed) {
      return 'Payment already verified';
    }

    return 'Payment successful';
  },
};

module.exports = { paymentMutations };
