'use strict';

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  text: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
