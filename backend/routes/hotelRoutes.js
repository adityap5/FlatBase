// backend/routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');

// Add a hotel
router.post('/', auth, async (req, res) => {
  const { name, location, description, price } = req.body;

  try {
    const hotel = new Hotel({
      name,
      location,
      description,
      price,
      seller: req.user.id,
    });

    await hotel.save();
    res.json(hotel);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).send('Hotel not found');

    res.json(hotel);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
