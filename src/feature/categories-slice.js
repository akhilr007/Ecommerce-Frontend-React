import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    return await response.json();
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    value: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = true;
      state.value = action.payload;
    });
  },
});

export default categoriesSlice.reducer;
