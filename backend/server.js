// // backend/server.js
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// connectDB();


// // CORS Middleware (Allow requests from frontend)

// app.use(cors({ origin: "https://flatbase-1.onrender.com", credentials: true }));

// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/flats', require('./routes/flatRoutes'));
// app.use('/api/bookings', require('./routes/bookingRoutes,'));

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Server is running fine");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const { expressMiddleware } = require('@as-integrations/express4');
const { ApolloServer } = require('@apollo/server');
const cors = require('cors');
const { json } = require('body-parser');
const connectDB = require('./config/db');
const createApolloServer = require('./graphql/schema');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Enable CORS
app.use(cors());

// Apollo setup
(async () => {
  const apolloServer = await createApolloServer();

  

  // ✅ Important: attach json() **inside the same middleware call**
  app.use(
    '/graphql',
    express.json(), // ensures req.body is populated for POST
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        // get token from headers if you need authentication
        const token = req.headers.authorization || '';
        return { token };
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
})();

