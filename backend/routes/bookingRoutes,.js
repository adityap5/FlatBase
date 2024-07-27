
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  const { flat, timePeriod, totalPrice } = req.body;

  try {
    const booking = new Booking({
      flat,
      user: req.user.id,
      timePeriod,
      totalPrice,
    });

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


router.get('/mybookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('flat');
    res.json(bookings);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    res.json(booking);
  
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) =>{
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'booking not found' });
    }
    await booking.deleteOne()
    res.json({message : 'Booking deleted successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
