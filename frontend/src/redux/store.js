import { configureStore } from '@reduxjs/toolkit';
import flatsReducer from './flatsSlice';

const store = configureStore({
  reducer: {
    flats: flatsReducer,
  },
});

export default store;
