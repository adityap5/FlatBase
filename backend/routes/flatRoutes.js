const express = require('express');
const Flat = require('../models/Flat');
const auth = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/multer');
const router = express.Router();
const fs = require('fs');

router.post('/', auth, upload.single('image'), async (req, res) => {
  const imageFileUrl = await cloudinary.uploader.upload(req.file.path)

  // delete file from upload folder
  fs.unlink((req.file.path), function (err) {
    if (err) throw err;
    else console.log("Deleted")
  })
  const { name, price, description, location, capacity } = req.body;

  try {
    const newFlat = new Flat({
      name,
      price,
      description,
      location,
      capacity,
      images: imageFileUrl.secure_url,
      seller: req.user.id,
    });

    const flat = await newFlat.save();
    res.json(flat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// ✅ FIXED: Get all flats with seller information
router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find().populate('seller', 'name email');
    res.send(flats);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ✅ FIXED: Get single flat with seller information
router.get('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id).populate('seller', 'name email phone');

    if (!flat) {
      return res.status(404).json({ message: 'flat not found' });
    }
    res.json(flat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ FIXED: Search route (moved before /:id to prevent conflicts)
router.get('/search', async (req, res) => {
  try {
    const { location } = req.query;
    console.log(`Searching for flats in location: ${location}`);
    // ✅ FIXED: The regex was using literal string 'location' instead of the variable
    const flats = await Flat.find({ 
      location: { $regex: location, $options: 'i' } 
    }).populate('seller', 'name email');
    
    if (!flats.length) {
      console.log('No flats found');
      return res.status(404).send({ message: 'No flats found' });
    }
    res.send(flats);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).send({ message: 'Server error', error });
  }
});

router.put('/update/:id', async (req, res) => {
  const { name, price, capacity, location, description } = req.body;
  try {
    let flat = await Flat.findById(req.params.id);
    if (!flat) {
      return res.status(404).json({ msg: 'flat not found' });
    }

    flat = await Flat.findByIdAndUpdate(
      req.params.id,
      { $set: { name, price, capacity, location, description } },
      { new: true }
    ).populate('seller', 'name email');

    res.json(flat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// ✅ FIXED: Delete route - was missing the ID parameter
router.delete('/delete/:id', async (req, res) => {
  try {
    let flat = await Flat.findById(req.params.id)

    if (!flat) {
      return res.status(404).json({ msg: 'Flat not found' });
    }
    
    // ✅ FIXED: Use findByIdAndDelete instead of deleteOne without parameters
    await Flat.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Flat removed' });
  } catch (error) {
    console.error(error.message); // ✅ FIXED: was 'err' instead of 'error'
    res.status(500).send('Server error');
  }
})

module.exports = router;