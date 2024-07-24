const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

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


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id , role: user.role}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      res.send(users);
  } catch (error) {
      res.status(500).send(error);
  }
});
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//my listings
// router.get('/mylistings', auth, async (req, res) => {
//   try {
//     const mylisting = await Hotel.find({ user: req.user.id }).populate('hotel');
//     res.json(mylisting);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
