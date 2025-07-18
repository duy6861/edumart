// src/features/filter/filterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { removeVietnameseTones } from '../data/keywords';

const initialState = {
  searchTerm: '',
  priceFilter: 'all',
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // reset page khi search
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
      state.currentPage = 1; // reset page khi filter
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = '';
      state.priceFilter = 'all';
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchTerm,
  setPriceFilter,
  setCurrentPage,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;

// Selector lọc sản phẩm từ state.products
export const selectFilteredProducts = (state) => {
  const products = state.products.products;
  const { searchTerm, priceFilter } = state.filters;

  let filtered = [...products];

  if (searchTerm) {
    const normalizedSearch = removeVietnameseTones(searchTerm.toLowerCase());
    filtered = filtered.filter((p) => {
      const normalizedName = removeVietnameseTones(p.name.toLowerCase());
      return normalizedName.includes(normalizedSearch);
    });
  }

  if (priceFilter === 'under500k') {
    filtered = filtered.filter((p) => p.price < 500000);
  } else if (priceFilter === '500kTo1m') {
    filtered = filtered.filter((p) => p.price >= 500000 && p.price <= 1000000);
  } else if (priceFilter === 'over1m') {
    filtered = filtered.filter((p) => p.price > 1000000);
  }

  return filtered;
};
