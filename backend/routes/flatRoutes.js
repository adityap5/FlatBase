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
router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find();
    res.send(flats);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) {
      return res.status(404).json({ message: 'flat not found' });
    }
    res.json(flat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/search', async (req, res) => {
  try {
    const { location } = req.query;
    console.log(`Searching for flats in location: ${location}`);
    const flats = await Flat.find({ location: { $regex: /location/i } });
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
    );

    res.json(flat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})
router.delete('/delete/:id', async (req, res) => {
  try {
    let flat = await Flat.findById(req.params.id)

    if (!flat) {
      return res.status(404).json({ msg: 'Flat not found' });
    }
    await Flat.deleteOne();
    res.json({ msg: 'Flat removed' });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;
