import { configureStore } from '@reduxjs/toolkit';
import productReducer from './api/productSlice';
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;