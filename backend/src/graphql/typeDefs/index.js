'use strict';

/**
 * src/graphql/typeDefs/index.js
 * GraphQL SDL — type definitions only.
 * All field names and types are identical to the original schema.js to preserve the API contract.
 */

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
    flatCount: Int!
    image: String
  }

  type AuthPayload {
    token: String!
    user: User!
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
    cancelBooking(id: ID!): String
    deleteBooking(id: ID!): String

    # Reviews
    addReview(flat: ID!, user: ID!, rating: Int!, text: String): Review

    # Razorpay
    createOrder(bookingId: ID!): RazorpayOrder
    verifyPayment(
      razorpay_order_id: String!
      razorpay_payment_id: String!
      razorpay_signature: String!
      bookingId: ID!
      startDate: String
      endDate: String
    ): String
  }
`;

module.exports = typeDefs;
