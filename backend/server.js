// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes,'));

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
res.send("Server is running fine")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
