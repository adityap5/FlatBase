// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
// Register
router.post('/register', async (req, res)=> {
  const { name, email, password ,role} = req.body;
  try {
      const user = new User({ name,email, password ,role});
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '1h',
            });
            res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
