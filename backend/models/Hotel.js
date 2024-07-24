const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
