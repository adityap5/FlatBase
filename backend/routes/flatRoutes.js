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
    const { name, price,description, location, capacity } = req.body;
    
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

router.get('/search?location', async (req, res) => {
    try {
        const { local } = req.query;
        console.log(local)
        const flats = await Flat.find({ location: new RegExp(local, 'i') });
        res.send(flats);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
