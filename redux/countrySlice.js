const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
import { menuCountry } from '../src/http';
const countrySlice = createSlice({
  name: 'menucountry',
  initialState: {
    data: [],
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountry.pending, (state, action) => {
      })
      .addCase(fetchCountry.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchCountry.rejected, (state, action) => {
      });
  },
});

export const { setCountry, setStatus } = countrySlice.actions;
export default countrySlice.reducer;

// Thunks
export const fetchCountry = createAsyncThunk('country', async () => {
  try {
    const res = await menuCountry();
    return res.data.data;
  }
  catch(err) {
    console.log(err)
  }
});

