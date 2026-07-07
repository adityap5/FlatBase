'use strict';

/**
 * src/config/env.js
 * Validates required environment variables at startup.
 * Call this before anything else in server.js to fail fast
 * with a clear message rather than cryptic runtime errors.
 */

const REQUIRED_VARS = [
  'MONGO_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_SECRET_KEY',
  'RAZORPAY_KEY_ID',
  'RAZORPAY_KEY_SECRET',
];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `[startup] Missing required environment variables:\n  ${missing.join('\n  ')}\n\n` +
      `Copy .env.example to .env and fill in the values.`
    );
    process.exit(1);
  }
}

module.exports = validateEnv;
