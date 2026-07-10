'use strict';

/**
 * src/services/paymentService.js
 * Razorpay SDK initialisation, order creation, and payment signature verification.
 * Initialised once; razorpay instance is reused across requests.
 */

const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialised lazily so tests can import this file before env is loaded
let _razorpay = null;

function getRazorpay() {
  if (!_razorpay) {
    _razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _razorpay;
}

/**
 * Creates a Razorpay order.
 * @param {number} amount - Amount in INR (not paisa — conversion done here)
 * @param {string} currency - e.g. 'INR'
 */
async function createOrder(amount, currency = 'INR') {
  return getRazorpay().orders.create({
    amount: Math.round(amount * 100), // convert to paisa safely
    currency,
    receipt: `receipt_${Date.now()}`,
  });
}

/**
 * Verifies Razorpay HMAC signature.
 * @returns {boolean} true if signature matches
 */
function verifySignature(orderId, paymentId, signature) {
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch (e) {
    return false;
  }
}

/**
 * Verifies Razorpay webhook HMAC signature.
 * @param {Buffer} rawBody - Raw unparsed request body buffer
 * @param {string} signature - x-razorpay-signature header
 * @returns {boolean} true if signature matches
 */
function verifyWebhookSignature(rawBody, signature) {
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch (e) {
    return false;
  }
}

module.exports = { createOrder, verifySignature, verifyWebhookSignature };
