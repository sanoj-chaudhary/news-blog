const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
import { addBanners } from '../src/http';
const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    data: [],
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state, action) => {
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
      });
  },
});

export const { setAds, setStatus } = adsSlice.actions;
export default adsSlice.reducer;

// Thunks
export const fetchAds = createAsyncThunk('ads', async () => {
 
    const res = await addBanners();
    return res.data.data;
 
});

