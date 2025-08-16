
const { ApolloServer } = require('@apollo/server');
const Flat = require('../models/Flat')
const User = require('../models/User');
const Booking = require('../models/Booking');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const typeDefs = `#graphql

   type Seller {
    _id: ID!
    name: String!
    email: String!
    phone: String
  }

  type Flat {
    _id: ID!
    name: String
    price: Float!
    description: String
    location: String!
    capacity: Int
    images: String
    seller: Seller
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    role: String
  }

  type Booking {
    _id: ID!
    flat: Flat!
    user: User!
    timePeriod: String!
    totalPrice: Float!
  }

  type RazorpayOrder {
    id: String!
    amount: Int!
    currency: String!
    receipt: String!
  }

  type Query {
    # Flats
    flats: [Flat]
    flat(id: ID!): Flat
    searchFlats(location: String!): [Flat]
    
    # Users
    users: [User]
    user(id: ID!): User
    
    # Bookings
    myBookings(userId: ID!): [Booking]
    booking(id: ID!): Booking
  }
type AuthPayload {
  token: String!
  user: User!
}
  type Mutation {
    # Flats
    addFlat(
      name: String!
      price: Float!
      description: String
      location: String!
      capacity: Int
      images: String
      seller: ID!
    ): Flat
    updateFlat(
      id: ID!
      name: String
      price: Float
      description: String
      location: String
      capacity: Int
    ): Flat
    deleteFlat(id: ID!): String

    # Users
    register(name: String!, email: String!, password: String!, role: String): AuthPayload
    login(email: String!, password: String!): AuthPayload

    # Bookings
    createBooking(flat: ID!, user: ID!, timePeriod: String!, totalPrice: Float!): Booking
    deleteBooking(id: ID!): String

    # Razorpay
    createOrder(amount: Float!, currency: String): RazorpayOrder
    verifyPayment(
      razorpay_order_id: String!,
      razorpay_payment_id: String!,
      razorpay_signature: String!,
      bookingId: ID!
    ): String
  }
`
const resolvers = {
    Query: {
        flats: async () => await Flat.find().populate('seller', 'name email phone'),
        flat: async (_, { id }) => await Flat.findById(id).populate('seller', 'name email phone'),
        searchFlats: async (_, { location }) =>
            await Flat.find({ location: { $regex: location, $options: 'i' } }).populate('seller', 'name email'),

        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id),

        myBookings: async (_, { userId }) =>
            await Booking.find({ user: userId }).populate('flat').populate('user'),
        booking: async (_, { id }) => await Booking.findById(id).populate('flat').populate('user'),
    },

    Mutation: {
        addFlat: async (_, args) => {
            const flat = new Flat(args);
            return await flat.save();
        },
        updateFlat: async (_, { id, ...update }) =>
            await Flat.findByIdAndUpdate(id, update, { new: true }).populate('seller', 'name email phone'),
        deleteFlat: async (_, { id }) => {
            await Flat.findByIdAndDelete(id);
            return "Flat deleted successfully";
        },

        register: async (_, { name, email, password, role }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error("User already exists");

            const user = new User({ name, email, password, role });
            await user.save();

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            return { token,user };
        },

        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error("Invalid credentials");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            return { token,user };
        },

        createBooking: async (_, args) => {
            const booking = new Booking(args);
            return await booking.save();
        },
        deleteBooking: async (_, { id }) => {
            await Booking.findByIdAndDelete(id);
            return "Booking deleted successfully";
        },

        createOrder: async (_, { amount, currency = 'INR' }) => {
            const order = await razorpay.orders.create({
                amount: amount * 100,
                currency,
                receipt: `receipt_${Date.now()}`
            });
            return order;
        },
        verifyPayment: async (_, { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId }) => {
            const generated_signature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest('hex');

            if (generated_signature !== razorpay_signature) {
                throw new Error("Payment verification failed");
            }

            await Booking.findByIdAndDelete(bookingId);
            return "Payment successful, booking deleted";
        }
    }
};

const createApolloServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers, introspection: true});
  await server.start();
  return server;
};

module.exports = createApolloServer;