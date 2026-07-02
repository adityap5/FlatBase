import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../services/apolloClient';
import { GET_FLATS, SEARCH_FLATS } from '../services/queries';

export const fetchFlats = createAsyncThunk('flats/fetchFlats', async () => {
  const result = await client.query({ query: GET_FLATS, fetchPolicy: 'cache-first' });
  return result.data.flats;
});

export const fetchFlatsByLocation = createAsyncThunk(
  'flats/fetchFlatsByLocation',
  async (location) => {
    const result = await client.query({
      query: SEARCH_FLATS,
      variables: { location },
      fetchPolicy: 'network-only',
    });
    return result.data.searchFlats;
  }
);

const flatsSlice = createSlice({
  name: 'flats',
  initialState: { flats: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlats.pending,   (state) => { state.loading = true; })
      .addCase(fetchFlats.fulfilled, (state, action) => { state.loading = false; state.flats = action.payload; })
      .addCase(fetchFlats.rejected,  (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(fetchFlatsByLocation.pending,   (state) => { state.loading = true; })
      .addCase(fetchFlatsByLocation.fulfilled, (state, action) => { state.loading = false; state.flats = action.payload; })
      .addCase(fetchFlatsByLocation.rejected,  (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default flatsSlice.reducer;
