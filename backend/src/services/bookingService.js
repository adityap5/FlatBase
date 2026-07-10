'use strict';

const Booking = require('../models/Booking');
const Flat = require('../models/Flat');
const Review = require('../models/Review');
const logger = require('../utils/logger');

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

async function getMyBookings(userId) {
  return Booking.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate('flat')
    .populate('user');
}

async function getBookingById(id) {
  return Booking.findById(id)
    .populate({ path: 'flat', populate: { path: 'seller' } })
    .populate('user');
}

async function getSellerBookings(sellerId) {
  const sellerFlats = await Flat.find({ seller: sellerId }).select('_id');
  const flatIds = sellerFlats.map((f) => f._id);

  return Booking.find({ flat: { $in: flatIds } })
    .sort({ createdAt: -1 })
    .populate('flat')
    .populate('user');
}

async function getSellerAnalytics(sellerId) {
  const sellerFlats = await Flat.find({ seller: sellerId });
  const flatIds = sellerFlats.map((f) => f._id);

  const bookings = await Booking.find({
    flat: { $in: flatIds },
    paymentStatus: 'paid',
  });

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const now = new Date();
  const monthlyData = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = MONTH_NAMES[d.getMonth()];

    const monthBookings = bookings.filter((b) => {
      const bDate = new Date(b.createdAt);
      return (
        bDate.getMonth() === d.getMonth() &&
        bDate.getFullYear() === d.getFullYear()
      );
    });

    monthlyData.push({
      month: monthStr,
      revenue: monthBookings.reduce((sum, b) => sum + b.totalPrice, 0),
      bookings: monthBookings.length,
    });
  }

  const reviews = await Review.find({ flat: { $in: flatIds } });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const currentMonthBookings = bookings.filter((b) => {
    const bDate = new Date(b.createdAt);
    return (
      bDate.getMonth() === now.getMonth() &&
      bDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return {
    totalRevenue,
    activeListings: sellerFlats.length,
    monthlyBookings: currentMonthBookings,
    avgRating,
    monthlyData,
  };
}

const mongoose = require('mongoose');

async function createBooking(args) {
  const requestedMonths = [];
  if (args.startDate && args.endDate) {
    const start = new Date(args.startDate);
    const end = new Date(args.endDate);
    let current = new Date(start.getFullYear(), start.getMonth(), 1);
    while (current <= end) {
      requestedMonths.push(
        `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`
      );
      current.setMonth(current.getMonth() + 1);
    }
  } else if (args.startDate) {
    requestedMonths.push(args.startDate);
  }

  const bookingId = new mongoose.Types.ObjectId();
  const lockExpiry = new Date(Date.now() + 7 * 60 * 1000);

  const flat = await Flat.findOneAndUpdate(
    {
      _id: args.flat,
      blockedMonths: { $nin: requestedMonths },
      pendingLocks: {
        $not: {
          $elemMatch: {
            expiresAt: { $gt: new Date() },
            months: { $in: requestedMonths }
          }
        }
      }
    },
    {
      $push: {
        pendingLocks: { bookingId, months: requestedMonths, expiresAt: lockExpiry }
      }
    },
    { new: true }
  );

  if (!flat) {
    throw new Error('These dates are currently being booked by another user. Please try again in 7 minutes or choose different dates.');
  }

  const booking = new Booking({
    _id: bookingId,
    ...args,
    months: requestedMonths
  });
  const saved = await booking.save();

  return Booking.findById(saved._id).populate('flat').populate('user');
}

async function deleteBookingById(id) {
  return Booking.findByIdAndDelete(id);
}

async function cancelBooking(bookingId, userId) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error('Booking not found');
  if (booking.user.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }

  // Release the lock
  await Flat.updateOne(
    { _id: booking.flat },
    { $pull: { pendingLocks: { bookingId } } }
  );
  
  // Delete or mark failed
  return Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'failed' }, { new: true });
}

async function confirmPaymentAtomic(bookingId, paymentId) {
  // Atomic conditional update as the gate (Idempotency + Race Condition Fix)
  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId, paymentStatus: { $ne: 'paid' } },
    { $set: { paymentStatus: 'paid', paymentId: paymentId } },
    { new: false }
  );

  if (!booking) {
    return false;
  }

  await Flat.updateOne(
    { _id: booking.flat },
    {
      $pull: { pendingLocks: { bookingId } },
      $push: { blockedMonths: { $each: booking.months } }
    }
  );

  return true;
}

async function markBookingPaid(bookingId, paymentId) {
  return Booking.findByIdAndUpdate(
    bookingId,
    { paymentStatus: 'paid', paymentId },
    { new: true }
  );
}

async function updateBookingOrderId(bookingId, orderId) {
  return Booking.findByIdAndUpdate(bookingId, { orderId }, { new: true });
}

module.exports = {
  getMyBookings,
  getBookingById,
  getSellerBookings,
  getSellerAnalytics,
  createBooking,
  deleteBookingById,
  cancelBooking,
  confirmPaymentAtomic,
  markBookingPaid,
  updateBookingOrderId,
};
