'use strict';

/**
 * src/services/userService.js
 * All database operations related to User documents,
 * plus JWT generation and password verification.
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

async function getUsers() {
  return User.find();
}

async function getUserById(id) {
  return User.findById(id);
}

async function registerUser({ name, email, password, role }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error('User already exists');
    err.code = 'USER_EXISTS';
    throw err;
  }

  const user = new User({ name, email, password, role });
  await user.save();

  const token = signToken(user);
  return { token, user };
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error('Invalid credentials');
    err.code = 'INVALID_CREDENTIALS';
    throw err;
  }

  const token = signToken(user);
  return { token, user };
}

async function updateSellerProfile(id, { name, email, phone, bio }) {
  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (email !== undefined) updateFields.email = email;
  if (phone !== undefined) updateFields.phone = phone;
  if (bio !== undefined) updateFields.bio = bio;

  return User.findByIdAndUpdate(id, updateFields, { new: true });
}

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateSellerProfile,
};
