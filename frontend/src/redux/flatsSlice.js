import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFlats } from '../api';

export const fetchFlats = createAsyncThunk('flats/fetchFlats', async () => {
  const { data } = await getFlats();
  return data;
});

export const fetchFlatsByLocation = createAsyncThunk(
  'flats/fetchFlatsByLocation',
  async (location) => {
    const { data } = await getFlats();
    // Filter flats based on exact location match
    const filteredFlats = data.filter((flat) =>
      flat.location.toLowerCase() === location.toLowerCase()
    );
    return filteredFlats;
  }
);

const flatsSlice = createSlice({
  name: 'flats',
  initialState: {
    flats: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlats.fulfilled, (state, action) => {
        state.loading = false;
        state.flats = action.payload;
      })
      .addCase(fetchFlats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFlatsByLocation.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlatsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.flats = action.payload;
      })
      .addCase(fetchFlatsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default flatsSlice.reducer;
