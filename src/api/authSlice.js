// src/api/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    authChecked: false, // ✅ Thêm trạng thái: đã kiểm tra xong chưa
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.authChecked = true; // ✅ Đã kiểm tra xong
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = true; // ✅ Dù đăng xuất, cũng đã kiểm tra xong
    },
    // ✅ Thêm action để đánh dấu đã kiểm tra xong
    setAuthChecked: (state) => {
      state.authChecked = true;
    }
  },
});

export const { login, logout, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;