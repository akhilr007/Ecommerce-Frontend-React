import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./feature/cart-slice";
import productsSlice from "./feature/products-slice";
import categoriesSlice from "./feature/categories-slice";
import checkoutSlice from "./feature/checkout-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    categories: categoriesSlice,
    checkout: checkoutSlice,
  },
});

export default store;
