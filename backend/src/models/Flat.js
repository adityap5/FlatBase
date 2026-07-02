'use strict';

const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  name:         { type: String,  required: true },
  price:        { type: Number,  required: true },
  capacity:     { type: Number,  required: true },
  location:     { type: String,  required: true },
  description:  { type: String,  required: true },
  images:       { type: String,  required: true },
  seller:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amenities:    { type: [String], default: [] },
  bookingCount: { type: Number,  default: 0 },
  blockedMonths:{ type: [String], default: [] }, // format: "YYYY-MM"
  pendingLocks: [{
    bookingId: { type: mongoose.Schema.Types.ObjectId, required: true },
    months: { type: [String], required: true },
    expiresAt: { type: Date, required: true }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Flat', flatSchema);
