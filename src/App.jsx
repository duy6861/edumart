// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import WishlistPage from './pages/WishlistPage';
import { ToastContainer } from 'react-toastify';
import HistoryPage from './pages/HistoryPage';
import Chatbot from './components/Chatbot';
import AuthPage from './pages/AuthPage';
import { auth } from './firebase';
import { login, setAuthChecked } from './api/authSlice';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // ✅ Thêm trạng thái loading

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          photo: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email.split('@')[0])}&background=059669&color=fff&rounded=true&length=2`,
        };
        dispatch(login(userData));
      } else {
        dispatch(setAuthChecked()); // ✅ Dù không đăng nhập, cũng đã kiểm tra xong
      }
      // ✅ Luôn gọi setAuthChecked khi có kết quả
      dispatch(setAuthChecked());
      setLoading(false); // ✅ Dừng loading
    });

    // Nếu có lỗi, cũng nên dừng loading
    return () => unsubscribe();
  }, [dispatch]);

  // ✅ Hiển thị nothing hoặc spinner trong lúc loading
  if (loading) {
    return (
      <Router>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-green-600 font-semibold">Đang tải...</div>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<h1 className="text-red-500">404 - Không tìm thấy trang</h1>} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Chatbot />
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

export default App;