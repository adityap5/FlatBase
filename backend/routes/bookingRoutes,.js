const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay Order
router.post('/create-order', auth, async (req, res) => {
  const { amount, currency = 'INR' } = req.body;

  try {
      const options = {
          amount: amount * 100, // Convert to paisa (INR 100 = 10000)
          currency,
          receipt: `receipt_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
  } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
  }
});

// Verify Razorpay Payment
router.post('/verify-payment', auth, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

        // Verify payment signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }

        // ✅ Delete the booking from MongoDB after successful payment
        await Booking.findByIdAndDelete(bookingId);

        return res.json({ success: true, message: 'Payment successful, booking deleted' });
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ success: false, message: 'Server error during payment verification' });
    }
});

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
