// src/api.js
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
      seller {
        _id
        name
        email
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
      seller {
        _id
        name
        email
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
      }
      user {
        _id
      }
      timePeriod
      totalPrice
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
  ) {
    addFlat(
      name: $name
      price: $price
      description: $description
      location: $location
      capacity: $capacity
      images: $images
      seller: $seller
    ) {
      _id
      name
      price
      location
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
  ) {
    updateFlat(
      id: $id
      name: $name
      price: $price
      description: $description
      location: $location
      capacity: $capacity
    ) {
      _id
      name
      price
      location
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
  mutation CreateBooking($flat: ID!, $user: ID!, $timePeriod: String!, $totalPrice: Float!) {
    createBooking(flat: $flat, user: $user, timePeriod: $timePeriod, totalPrice: $totalPrice) {
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
      }
      user {
        _id
        name
      }
      timePeriod
      totalPrice
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

// Get single booking

