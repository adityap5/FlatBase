'use strict';

const Review = require('../models/Review');

async function getFlatReviews(flatId) {
  return Review.find({ flat: flatId })
    .sort({ createdAt: -1 })
    .populate('user');
}

async function addReview(args) {
  const review = new Review(args);
  const saved = await review.save();
  return Review.findById(saved._id).populate('user').populate('flat');
}

module.exports = { getFlatReviews, addReview };
