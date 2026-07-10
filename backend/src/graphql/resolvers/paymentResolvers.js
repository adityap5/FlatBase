'use strict';

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
  createOrder: async (_, { bookingId }, context) => {
    requireAuth(context);
    const booking = await bookingService.getBookingById(bookingId);
    
    if (!booking) {
      throw new GraphQLError('Booking not found', { extensions: { code: 'NOT_FOUND' } });
    }
    if (booking.user._id.toString() !== context.user.id.toString()) {
      throw new GraphQLError('Unauthorized', { extensions: { code: 'FORBIDDEN' } });
    }
    if (booking.paymentStatus === 'paid') {
      throw new GraphQLError('Booking already paid', { extensions: { code: 'BAD_REQUEST' } });
    }

    // Server-side amount calculation
    const securityDeposit = 999;
    const timePeriod = parseInt(booking.timePeriod || '1');
    const advancePayment = Math.round(booking.totalPrice / timePeriod);
    const totalAmount = booking.totalPrice + securityDeposit + advancePayment;

    // We explicitly supersede any existing order to avoid ambiguity and ensure amount accuracy
    const order = await paymentService.createOrder(totalAmount, 'INR');

    // Bind the new order to the booking
    await bookingService.updateBookingOrderId(bookingId, order.id);

    return order;
  },

  verifyPayment: async (
    _,
    { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, startDate, endDate },
    context
  ) => {
    requireAuth(context);

    const booking = await bookingService.getBookingById(bookingId);
    if (!booking) {
      throw new GraphQLError('Booking not found', { extensions: { code: 'NOT_FOUND' } });
    }

    // Backward compatibility for in-flight bookings & Strict Order-Booking Binding
    if (!booking.orderId) {
      await bookingService.updateBookingOrderId(bookingId, razorpay_order_id);
    } else if (booking.orderId !== razorpay_order_id) {
      throw new GraphQLError('Order ID mismatch. Potential replay attack.', { extensions: { code: 'BAD_REQUEST' } });
    }

    const isValid = paymentService.verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      // Payment verification failed. Immediately release lock.
      await bookingService.cancelBooking(bookingId, context.user.id);
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
