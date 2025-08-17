import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../apolloClient';
import { GET_FLATS, SEARCH_FLATS } from '../graphql/queries';

// Fetch all flats
export const fetchFlats = createAsyncThunk('flats/fetchFlats', async () => {
  const result = await client.query({
    query: GET_FLATS,
    fetchPolicy: 'network-only',
  });
  return result.data.flats; // Apollo puts data under data key
});

// Fetch flats by location
export const fetchFlatsByLocation = createAsyncThunk(
  'flats/fetchFlatsByLocation',
  async (location) => {
    const result = await client.query({
      query: SEARCH_FLATS,
      variables: { location },
      fetchPolicy: 'network-only',
    });
    return result.data.searchFlats; // Apollo query result
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
      // fetchFlats
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
      // fetchFlatsByLocation
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
