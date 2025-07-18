import { configureStore } from '@reduxjs/toolkit';
import productReducer from './api/productSlice';
import filterReducer from './api/filterSlice';
const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
  },
});

export default store;