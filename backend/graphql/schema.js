
const { ApolloServer } = require('@apollo/server');
const Flat = require('../models/Flat')
const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
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
    bio: String
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
    amenities: [String]
    bookingCount: Int
    blockedMonths: [String]
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    role: String
    phone: String
    bio: String
  }

  type Booking {
    _id: ID!
    flat: Flat!
    user: User!
    timePeriod: String!
    totalPrice: Float!
    paymentStatus: String
    paymentId: String
    startDate: String
    endDate: String
    createdAt: String
  }

  type Review {
    _id: ID!
    flat: Flat!
    user: User!
    rating: Int!
    text: String
    createdAt: String
  }

  type MonthlyAnalytics {
    month: String!
    revenue: Float!
    bookings: Int!
  }

  type SellerAnalytics {
    totalRevenue: Float!
    activeListings: Int!
    monthlyBookings: Int!
    avgRating: Float!
    monthlyData: [MonthlyAnalytics]
  }

  type RazorpayOrder {
    id: String!
    amount: Int!
    currency: String!
    receipt: String!
  }

  type CityStats {
    city: String!
    count: Int!
    image: String
  }

  type Query {
    # Flats
    flats: [Flat]
    flat(id: ID!): Flat
    searchFlats(location: String!): [Flat]
    popularFlats: [Flat]
    popularCities: [CityStats]
    
    # Users
    users: [User]
    user(id: ID!): User
    
    # Bookings
    myBookings(userId: ID!): [Booking]
    sellerBookings(sellerId: ID!): [Booking]
    booking(id: ID!): Booking

    # Analytics
    sellerAnalytics(sellerId: ID!): SellerAnalytics

    # Reviews
    flatReviews(flatId: ID!): [Review]
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
      amenities: [String]
    ): Flat
    updateFlat(
      id: ID!
      name: String
      price: Float
      description: String
      location: String
      capacity: Int
      amenities: [String]
    ): Flat
    deleteFlat(id: ID!): String

    # Users
    register(name: String!, email: String!, password: String!, role: String): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateSellerProfile(id: ID!, name: String, email: String, phone: String, bio: String): User

    # Bookings
    createBooking(flat: ID!, user: ID!, timePeriod: String!, totalPrice: Float!, startDate: String, endDate: String): Booking
    deleteBooking(id: ID!): String

    # Reviews
    addReview(flat: ID!, user: ID!, rating: Int!, text: String): Review

    # Razorpay
    createOrder(amount: Float!, currency: String): RazorpayOrder
    verifyPayment(
      razorpay_order_id: String!,
      razorpay_payment_id: String!,
      razorpay_signature: String!,
      bookingId: ID!,
      startDate: String,
      endDate: String
    ): String
  }
`
const resolvers = {
    Query: {
        flats: async () => await Flat.find().populate('seller', 'name email phone bio'),
        flat: async (_, { id }) => await Flat.findById(id).populate('seller', 'name email phone bio'),
        searchFlats: async (_, { location }) =>
            await Flat.find({ location: { $regex: location, $options: 'i' } }).populate('seller', 'name email'),
        
        popularFlats: async () => await Flat.find().sort({ bookingCount: -1 }).limit(8).populate('seller', 'name email'),
        popularCities: async () => {
            const cities = await Flat.aggregate([
                { $group: { _id: "$location", count: { $sum: "$bookingCount" } } },
                { $sort: { count: -1 } },
                { $limit: 3 }
            ]);
            // Map the output to match CityStats type
            const cityMap = {
                'Delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80',
                'Chandigarh': 'https://images.unsplash.com/photo-1574610758891-5b809b6e6e2e?auto=format&fit=crop&q=80',
                'Bangalore': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80',
                'Mumbai': 'https://images.unsplash.com/photo-1522444195799-47853b1b608a?auto=format&fit=crop&q=80',
                'Goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80'
            };
            return cities.map(c => ({
                city: c._id,
                count: c.count,
                image: cityMap[c._id] || 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80'
            }));
        },

        users: async () => await User.find(),
        user: async (_, { id }) => await User.findById(id),

        myBookings: async (_, { userId }) =>
            await Booking.find({ user: userId }).sort({ createdAt: -1 }).populate('flat').populate('user'),
        booking: async (_, { id }) => await Booking.findById(id).populate({ path: 'flat', populate: { path: 'seller' } }).populate('user'),

        sellerBookings: async (_, { sellerId }) => {
            const sellerFlats = await Flat.find({ seller: sellerId }).select('_id');
            const flatIds = sellerFlats.map(f => f._id);
            return await Booking.find({ flat: { $in: flatIds } })
                .sort({ createdAt: -1 })
                .populate('flat')
                .populate('user');
        },
        
        sellerAnalytics: async (_, { sellerId }) => {
            const sellerFlats = await Flat.find({ seller: sellerId });
            const flatIds = sellerFlats.map(f => f._id);
            
            const bookings = await Booking.find({ 
                flat: { $in: flatIds },
                paymentStatus: 'paid'
            });

            const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
            
            // Generate monthly data for the last 6 months
            const monthlyData = [];
            const now = new Date();
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            
            for (let i = 5; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const monthStr = monthNames[d.getMonth()];
                
                const monthBookings = bookings.filter(b => {
                    const bDate = new Date(b.createdAt);
                    return bDate.getMonth() === d.getMonth() && bDate.getFullYear() === d.getFullYear();
                });
                
                monthlyData.push({
                    month: monthStr,
                    revenue: monthBookings.reduce((sum, b) => sum + b.totalPrice, 0),
                    bookings: monthBookings.length
                });
            }

            // Simple avg rating mock for now, or aggregate if reviews exist
            const reviews = await Review.find({ flat: { $in: flatIds } });
            const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) : 0;

            const currentMonthBookings = bookings.filter(b => {
                const bDate = new Date(b.createdAt);
                return bDate.getMonth() === now.getMonth() && bDate.getFullYear() === now.getFullYear();
            }).length;

            return {
                totalRevenue,
                activeListings: sellerFlats.length,
                monthlyBookings: currentMonthBookings,
                avgRating,
                monthlyData
            };
        },

        flatReviews: async (_, { flatId }) => 
            await Review.find({ flat: flatId }).sort({ createdAt: -1 }).populate('user'),
    },
      Flat: {
        price: (flat) => {
            return flat.price !== null && flat.price !== undefined ? flat.price : 0;
        }
    },

    Mutation: {
        addFlat: async (_, args) => {
            const flat = new Flat(args);
            return await flat.save();
        },
        updateFlat: async (_, { id, ...update }) =>
            await Flat.findByIdAndUpdate(id, update, { new: true }).populate('seller', 'name email phone bio'),
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

        updateSellerProfile: async (_, { id, name, email, phone, bio }) => {
            const updateFields = {};
            if (name) updateFields.name = name;
            if (email) updateFields.email = email;
            if (phone !== undefined) updateFields.phone = phone;
            if (bio !== undefined) updateFields.bio = bio;
            
            return await User.findByIdAndUpdate(id, updateFields, { new: true });
        },

        addReview: async (_, args) => {
            const review = new Review(args);
            const savedReview = await review.save();
            return await Review.findById(savedReview._id).populate('user').populate('flat');
        },

        createBooking: async (_, args) => {
            try {
                
                const flat = await Flat.findById(args.flat);
                if (!flat) {
                    throw new Error("Flat not found");
                }
                const booking = new Booking(args);
                const savedBooking = await booking.save();
                
                // Properly populate the booking with error handling
                const populatedBooking = await Booking.findById(savedBooking._id)
                    .populate('flat')
                    .populate('user');
                
                return populatedBooking;
            } catch (error) {
                console.error('Error creating booking:', error);
                throw error;
            }
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
        verifyPayment: async (_, { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId, startDate, endDate }) => {
            const generated_signature = crypto
                .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest('hex');

            if (generated_signature !== razorpay_signature) {
                throw new Error("Payment verification failed");
            }

            // Payment successful, update the booking to 'paid' and add transaction details
            const booking = await Booking.findByIdAndUpdate(bookingId, {
                paymentStatus: 'paid',
                paymentId: razorpay_payment_id
            }, { new: true });

            if (booking) {
                // Determine months to block
                const monthsToBlock = [];
                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    let current = new Date(start.getFullYear(), start.getMonth(), 1);
                    while (current <= end) {
                        monthsToBlock.push(`${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`);
                        current.setMonth(current.getMonth() + 1);
                    }
                } else if (booking.startDate) {
                    monthsToBlock.push(booking.startDate);
                }

                if (monthsToBlock.length > 0) {
                    // Update flat bookingCount and add to blockedDates
                    await Flat.findByIdAndUpdate(booking.flat, {
                        $inc: { bookingCount: 1 },
                        $addToSet: { blockedMonths: { $each: monthsToBlock } }
                    });
                } else {
                     await Flat.findByIdAndUpdate(booking.flat, {
                        $inc: { bookingCount: 1 }
                    });
                }
            }

            return "Payment successful";
        }
    }
};

const createApolloServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers, introspection: true});
  await server.start();
  return server;
};

module.exports = createApolloServer;