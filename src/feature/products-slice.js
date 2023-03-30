import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("products/fetchAll", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return await response.json();
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });
  },
});

export default productsSlice.reducer;
