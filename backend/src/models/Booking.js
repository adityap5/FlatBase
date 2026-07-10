'use strict';

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  flat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flat',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timePeriod: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
  paymentId: {
    type: String,
    default: '',
  },
  orderId: {
    type: String,
    default: '',
  },
  startDate: {
    type: String, // "YYYY-MM"
    default: '',
  },
  endDate: {
    type: String, // "YYYY-MM"
    default: '',
  },
  months: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
