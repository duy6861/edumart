import { configureStore } from '@reduxjs/toolkit';
import productReducer from './api/productSlice';
import filterReducer from './api/filterSlice';
import authReducer from './api/authSlice';
const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    auth: authReducer, // Thêm authReducer vào store
  },
});

export default store;