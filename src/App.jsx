import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home'; // Đảm bảo bạn import Home
import ProductDetail from './pages/ProductDetail';
import Footer from './components/Footer';
import WishlistPage from './pages/WishlistPage';
import { ToastContainer } from 'react-toastify';
import HistoryPage from './pages/HistoryPage';
function App() {
  return ( // <-- THIẾU RETURN TẠI ĐÂY
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
            {/* Fallback nếu không tìm thấy trang */}
            <Route path="*" element={<h1 className="text-red-500">404 - Không tìm thấy trang</h1>} />
            <Route path="/product/:id" element={<ProductDetail />} /> {/* Route cho ProductDetail */}
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/history" element={<HistoryPage />} /> {/* Đã dùng useViewHistory */}
          </Routes>
        </main>
        <Footer />
        {/* ✅ Thêm ToastContainer tại đây (cuối cùng trong layout) */}
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