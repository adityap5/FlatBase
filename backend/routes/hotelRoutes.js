// routes/hotelRoutes.js
const express = require('express');
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/multer');
const router = express.Router();
const fs = require('fs');


// Route to add a hotel

router.post('/', auth, upload.single('image'), async (req, res) => {
    const imageFileUrl = await cloudinary.uploader.upload(req.file.path)
   
    // delete file from upload
    fs.unlink((req.file.path), function (err) {
        if (err) throw err;
        else console.log("Deleted")
    })
    const { name, price,description, location, capacity } = req.body;
    
    try {
        const newHotel = new Hotel({
            name,
            price,
            description,
            location,
            capacity,
            images: imageFileUrl.secure_url,
            seller: req.user.id,
        });

        const hotel = await newHotel.save();
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// Route to get all hotels
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.send(hotels);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
  
      if (!hotel) {
        return res.status(404).json({ message: 'hotel not found' });
      }
      res.json(hotel);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Route to search hotels by location
router.get('/search', async (req, res) => {
    try {
        const { location } = req.query;
        console.log(location)
        const hotels = await Hotel.find({ location: new RegExp(location, 'i') });
        res.send(hotels);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
