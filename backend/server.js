require('dotenv').config();

// ── Validate env vars before anything else ──────────────────────────────────
const validateEnv       = require('./src/config/env');
validateEnv();

const express           = require('express');
const { expressMiddleware } = require('@as-integrations/express4');
const cors              = require('cors');
const jwt               = require('jsonwebtoken');
const connectDB         = require('./src/config/db');
const createApolloServer = require('./src/graphql/server');
const { helmetMiddleware, limiter } = require('./src/middleware/security');
const logger            = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

(async () => {
  const apolloServer = await createApolloServer();
  const app = express();

  // ── Security middleware ────────────────────────────────────────────────────
  app.use(helmetMiddleware);
  app.use(limiter);
  app.use(cors());

  // ── GraphQL endpoint ───────────────────────────────────────────────────────
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        // Verify JWT and attach decoded user (or null) to every request context.
        // Resolvers call requireAuth(context) to protect mutations.
        const authHeader = req.headers.authorization || '';
        const rawToken   = authHeader.startsWith('Bearer ')
          ? authHeader.slice(7)
          : authHeader;

        let user = null;
        if (rawToken) {
          try {
            user = jwt.verify(rawToken, process.env.JWT_SECRET);
          } catch {
            // Invalid / expired — stays null; public queries still work.
          }
        }

        return { user };
      },
    })
  );

  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}/graphql`);
  });

  // ── Lock Cleanup Cron Job ──────────────────────────────────────────────────
  const Flat = require('./src/models/Flat');
  setInterval(async () => {
    try {
      const result = await Flat.updateMany(
        { "pendingLocks.expiresAt": { $lt: new Date() } },
        { $pull: { pendingLocks: { expiresAt: { $lt: new Date() } } } }
      );
      if (result.modifiedCount > 0) {
        logger.info(`Cleaned up ${result.modifiedCount} expired flat locks.`);
      }
    } catch (err) {
      logger.error('Failed to clean up expired flat locks', err);
    }
  }, 5 * 60 * 1000); // Every 5 minutes

})();
