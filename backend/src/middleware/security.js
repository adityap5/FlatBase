'use strict';

/**
 * src/middleware/security.js
 * Configures helmet (HTTP security headers) and express-rate-limit.
 * These are applied to the Express app in server.js before any routes.
 *
 * Settings are chosen to be safe defaults that do NOT change the
 * GraphQL response shape or break any existing frontend requests.
 */

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

/**
 * Helmet with cross-origin-embedder-policy disabled.
 * COEP breaks the Apollo Sandbox which uses SharedArrayBuffer.
 */
const helmetMiddleware = helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false, // Apollo Sandbox inlines scripts; re-enable with a proper CSP in production
});

/**
 * Rate limiter: max 200 requests per IP per 15 minutes.
 * Generous enough to not interfere with normal frontend usage.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { errors: [{ message: 'Too many requests, please try again later.' }] },
});

module.exports = { helmetMiddleware, limiter };
