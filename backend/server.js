// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();


// CORS Middleware (Allow requests from frontend)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/flats', require('./routes/flatRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes,'));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running fine");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
