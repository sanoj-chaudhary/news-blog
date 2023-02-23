const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
import { menuCategory } from '../src/http';
const categorySlice = createSlice({
  name: 'menucotegory',
  initialState: {
    data: [],
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
      });
  },
});

export const { setCategory, setStatus } = categorySlice.actions;
export default categorySlice.reducer;

// Thunks
export const fetchCategory = createAsyncThunk('category', async () => {
  try {
    const res = await menuCategory();
    return res.data.data;
  }
  catch(err) {
    console.log(err)
  }
});

