const express = require('express');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to add a hotel
router.post(
  '/',
  [
    auth,
    upload.array('images', 5),
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').isNumeric(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, location, roomsAvailable } = req.body;
    const images = req.files.map((file) => file.path);

    try {
      const newHotel = new Hotel({
        name,
        price,
        location,
        roomsAvailable,
        images,
        user: req.user.id,
      });

      const hotel = await newHotel.save();
      res.json(hotel);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route to get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.send(hotels);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to search hotels by location
router.get('/search', async (req, res) => {
  try {
    const { location } = req.query;
    const hotels = await Hotel.find({ location: new RegExp(location, 'i') });
    res.send(hotels);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
