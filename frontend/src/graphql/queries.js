// src/graphqlqueries.js
import { gql } from '@apollo/client';
import client from '../apolloClient';

// ------------------- Queries -------------------

// Get all flats
export const GET_FLATS = gql`
  query GetFlats {
    flats {
      _id
      name
      price
      description
      location
      capacity
      images
      amenities
      bookingCount
      seller {
        _id
        name
        email
        phone
        bio
      }
    }
  }
`;

// Get flat by ID
export const GET_FLAT = gql`
  query GetFlat($id: ID!) {
    flat(id: $id) {
      _id
      name
      price
      description
      location
      capacity
      images
      amenities
      blockedMonths
      bookingCount
      seller {
        _id
        name
        email
        phone
        bio
      }
    }
  }
`;

// Search flats by location
export const SEARCH_FLATS = gql`
  query SearchFlats($location: String!) {
    searchFlats(location: $location) {
      _id
      name
      price
      description
      location
      capacity
      images
      amenities
      bookingCount
      seller {
        _id
        name
        email
      }
    }
  }
`;

// Get bookings for user
export const GET_BOOKINGS = gql`
  query MyBookings($userId: ID!) {
    myBookings(userId: $userId) {
      _id
      flat {
        _id
        name
        price
        location
        images
      }
      user {
        _id
      }
      timePeriod
      totalPrice
      paymentStatus
      startDate
      endDate
      createdAt
    }
  }
`;

export const GET_SELLER_BOOKINGS = gql`
  query SellerBookings($sellerId: ID!) {
    sellerBookings(sellerId: $sellerId) {
      _id
      flat {
        _id
        name
        price
        location
      }
      user {
        _id
        name
        email
      }
      timePeriod
      totalPrice
      paymentStatus
      paymentId
      startDate
      endDate
      createdAt
    }
  }
`;

export const GET_SELLER_ANALYTICS = gql`
  query SellerAnalytics($sellerId: ID!) {
    sellerAnalytics(sellerId: $sellerId) {
      totalRevenue
      activeListings
      monthlyBookings
      avgRating
      monthlyData {
        month
        revenue
        bookings
      }
    }
  }
`;

export const GET_POPULAR_FLATS = gql`
  query PopularFlats {
    popularFlats {
      _id
      name
      price
      location
      images
      bookingCount
    }
  }
`;

export const GET_POPULAR_CITIES = gql`
  query PopularCities {
    popularCities {
      city
      count
      image
    }
  }
`;

export const GET_FLAT_REVIEWS = gql`
  query FlatReviews($flatId: ID!) {
    flatReviews(flatId: $flatId) {
      _id
      rating
      text
      createdAt
      user {
        _id
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      name
      email
      phone
      bio
      role
    }
  }
`;

// ------------------- Mutations -------------------

// Register
const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $role: String) {
    register(name: $name, email: $email, password: $password, role: $role) {
      token
      user {
        _id
        name
        email
        role
      }
    }
  }
`;

// Login
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        role
      }
    }
  }
`;

// Add a flat
export const ADD_FLAT = gql`
  mutation AddFlat(
    $name: String!
    $price: Float!
    $description: String
    $location: String!
    $capacity: Int
    $images: String
    $seller: ID!
    $amenities: [String]
  ) {
    addFlat(
      name: $name
      price: $price
      description: $description
      location: $location
      capacity: $capacity
      images: $images
      seller: $seller
      amenities: $amenities
    ) {
      _id
      name
      price
      location
      amenities
    }
  }
`;

// Update a flat
export const UPDATE_FLAT = gql`
  mutation UpdateFlat(
    $id: ID!
    $name: String
    $price: Float
    $description: String
    $location: String
    $capacity: Int
    $amenities: [String]
  ) {
    updateFlat(
      id: $id
      name: $name
      price: $price
      description: $description
      location: $location
      capacity: $capacity
      amenities: $amenities
    ) {
      _id
      name
      price
      location
      amenities
    }
  }
`;

// Delete a flat
export const DELETE_FLAT = gql`
  mutation DeleteFlat($id: ID!) {
    deleteFlat(id: $id)
  }
`;

// Create a booking
export const CREATE_BOOKING = gql`
  mutation CreateBooking($flat: ID!, $user: ID!, $timePeriod: String!, $totalPrice: Float!, $startDate: String, $endDate: String) {
    createBooking(flat: $flat, user: $user, timePeriod: $timePeriod, totalPrice: $totalPrice, startDate: $startDate, endDate: $endDate) {
      _id
      flat {
        _id
        name
        price
      }
      user {
        _id
        name
      }
      timePeriod
      totalPrice
      paymentStatus
      startDate
      endDate
    }
  }
`;

// Delete booking
export const DELETE_BOOKING = gql`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id)
  }
`;
const GET_BOOKING = gql`
  query GetBooking($id: ID!) {
    booking(id: $id) {
      _id
      flat {
        _id
        name
        price
        capacity
        location
        description
        images
        seller {
          name
        }
      }
      user {
        _id
        name
        email
      }
      timePeriod
      totalPrice
      paymentStatus
    }
  }
`;

export const UPDATE_SELLER_PROFILE = gql`
  mutation UpdateSellerProfile($id: ID!, $name: String, $email: String, $phone: String, $bio: String) {
    updateSellerProfile(id: $id, name: $name, email: $email, phone: $phone, bio: $bio) {
      _id
      name
      email
      phone
      bio
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($flat: ID!, $user: ID!, $rating: Int!, $text: String) {
    addReview(flat: $flat, user: $user, rating: $rating, text: $text) {
      _id
      rating
      text
      createdAt
      user {
        _id
        name
      }
    }
  }
`;

// ------------------- API Functions -------------------

export const register = (formData) =>
  client.mutate({ mutation: REGISTER, variables: formData });

export const login = (formData) =>
  client.mutate({ mutation: LOGIN, variables: formData });

export const addFlat = (flatData) =>
  client.mutate({ mutation: ADD_FLAT, variables: flatData });

export const getFlats = () =>
  client.query({ query: GET_FLATS, fetchPolicy: 'network-only' });

export const getFlat = (id) =>
  client.query({ query: GET_FLAT, variables: { id } });

export const getFlatByLocation = (location) =>
  client.query({ query: SEARCH_FLATS, variables: { location } });

export const createBooking = (bookingData) =>
  client.mutate({ mutation: CREATE_BOOKING, variables: bookingData });

export const getBookings = (userId) =>
  client.query({ query: GET_BOOKINGS, variables: { userId } });

// For seller: getMyListings is just filtering flats by seller ID
export const getMyListings = (sellerId) =>
  client.query({ query: GET_FLATS, fetchPolicy: 'network-only' }).then((res) =>
    res.data.flats.filter((flat) => flat.seller._id === sellerId)
  );

export const updateListing = (id, data) =>
  client.mutate({ mutation: UPDATE_FLAT, variables: { id, ...data } });

export const deleteListing = (id) =>
  client.mutate({ mutation: DELETE_FLAT, variables: { id } });

export const deleteBooking = (id) =>
  client.mutate({ mutation: DELETE_BOOKING, variables: { id } });

export const getBooking = (id) =>
  client.query({ query: GET_BOOKING, variables: { id } });

// ------------------- Additional Queries -------------------

export const getSellerBookings = (sellerId) => client.query({ query: GET_SELLER_BOOKINGS, variables: { sellerId }, fetchPolicy: 'network-only' });
export const getSellerAnalytics = (sellerId) => client.query({ query: GET_SELLER_ANALYTICS, variables: { sellerId }, fetchPolicy: 'network-only' });

export const getPopularFlats = () => client.query({ query: GET_POPULAR_FLATS, fetchPolicy: 'network-only' });
export const getPopularCities = () => client.query({ query: GET_POPULAR_CITIES, fetchPolicy: 'network-only' });

export const getFlatReviews = (flatId) => client.query({ query: GET_FLAT_REVIEWS, variables: { flatId }, fetchPolicy: 'network-only' });
export const getUser = (id) => client.query({ query: GET_USER, variables: { id }, fetchPolicy: 'network-only' });

export const updateSellerProfile = (profileData) => client.mutate({ mutation: UPDATE_SELLER_PROFILE, variables: profileData });
export const addReview = (reviewData) => client.mutate({ mutation: ADD_REVIEW, variables: reviewData });
