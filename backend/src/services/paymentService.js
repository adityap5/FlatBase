'use strict';

const Razorpay = require('razorpay');
const crypto = require('crypto');

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
 * @param {number} amount
 * @param {string} currency 
 */
async function createOrder(amount, currency = 'INR') {
  return getRazorpay().orders.create({
    amount: Math.round(amount * 100),
    currency,
    receipt: `receipt_${Date.now()}`,
  });
}

/**
 * Verifies Razorpay HMAC signature.
 * @returns {boolean}
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
 * @param {Buffer} rawBody
 * @param {string} signature
 * @returns {boolean}
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
