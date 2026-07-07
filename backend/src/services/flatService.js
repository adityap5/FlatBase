'use strict';

/**
 * src/services/flatService.js
 * All database operations related to Flat documents.
 * Resolvers call these functions; no HTTP/GraphQL concerns here.
 */

const Flat = require('../models/Flat');
const { getCityImage } = require('../utils/cityImages');

const SELLER_FIELDS = 'name email phone bio';

async function getFlats() {
  return Flat.find().populate('seller', SELLER_FIELDS);
}

async function getFlatById(id) {
  return Flat.findById(id).populate('seller', SELLER_FIELDS);
}

async function searchFlats(location) {
  return Flat.find({
    location: { $regex: location, $options: 'i' },
  }).populate('seller', 'name email');
}

async function getPopularFlats() {
  return Flat.find()
    .sort({ bookingCount: -1 })
    .limit(8)
    .populate('seller', 'name email');
}

async function getPopularCities() {
  const cities = await Flat.aggregate([
    { 
      $group: { 
        _id: '$location', 
        count: { $sum: '$bookingCount' },
        flatCount: { $sum: 1 }
      } 
    },
    { $sort: { count: -1 } }
  ]);

  return cities.map((c) => ({
    city: c._id,
    count: c.count,
    flatCount: c.flatCount,
    image: getCityImage(c._id),
  }));
}

async function getFlatsBySeller(sellerId) {
  return Flat.find({ seller: sellerId });
}

async function addFlat(args) {
  const flat = new Flat(args);
  return flat.save();
}

async function updateFlat(id, update) {
  return Flat.findByIdAndUpdate(id, update, { new: true }).populate(
    'seller',
    SELLER_FIELDS
  );
}

async function deleteFlatById(id) {
  return Flat.findByIdAndDelete(id);
}

/**
 * Increments bookingCount and, optionally, adds months to blockedMonths.
 */
async function updateFlatAfterPayment(flatId, monthsToBlock = []) {
  if (monthsToBlock.length > 0) {
    return Flat.findByIdAndUpdate(flatId, {
      $inc: { bookingCount: 1 },
      $addToSet: { blockedMonths: { $each: monthsToBlock } },
    });
  }
  return Flat.findByIdAndUpdate(flatId, { $inc: { bookingCount: 1 } });
}

module.exports = {
  getFlats,
  getFlatById,
  searchFlats,
  getPopularFlats,
  getPopularCities,
  getFlatsBySeller,
  addFlat,
  updateFlat,
  deleteFlatById,
  updateFlatAfterPayment,
};
