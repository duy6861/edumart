// src/components/Header.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../api/authSlice';
import { signOut, auth } from '../firebase';
import UnderDevelopmentModal from './UnderDevelopmentModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUndevelopedModal, setUndevelopedModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ✅ Thêm authChecked từ Redux
  const { user, isAuthenticated, authChecked } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // ✅ Hàm tạo URL avatar an toàn
  const getAvatarSrc = () => {
    if (user?.photo) return user.photo;
    const name = user?.name || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=059669&color=fff&rounded=true&length=2`;
  };

  // ✅ Hàm lấy tên hiển thị (họ tên cuối)
  const getDisplayName = () => {
    if (!user?.name) return 'Người dùng';
    const parts = user.name.trim().split(' ');
    return parts[parts.length - 1];
  };

  // ✅ Trong lúc chưa kiểm tra xong, hiển thị placeholder
  if (!authChecked) {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-green-600">Antoree</div>
          <div className="hidden sm:flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-500">Đang tải...</span>
          </div>
          <button className="sm:hidden text-gray-700">
            <div className="w-6 h-6 border border-gray-300 rounded animate-pulse"></div>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          <Link to="/">Antoree</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-green-600">Trang chủ</Link>
          <Link to="/courses" className="text-gray-700 hover:text-green-600">Khóa học</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">Về chúng tôi</Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-green-600">Yêu thích</Link>

          {/* Lịch sử xem */}
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(prev => !prev)}
          >
            <Link to="/history" className="text-gray-700 hover:text-green-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Link>
            <div className={`${showTooltip ? 'opacity-100' : 'opacity-0'} 
                            absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 
                            bg-gray-800 text-white text-xs rounded transition-opacity duration-200 
                            pointer-events-none whitespace-nowrap z-20`}>
              Sản phẩm đã xem
            </div>
          </div>

          <Link to="/contact" className="text-gray-700 hover:text-green-600">Liên hệ</Link>

          {/* Hiển thị người dùng hoặc nút đăng nhập */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
              >
                <img
                  src={getAvatarSrc()}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <span className="font-medium">{getDisplayName()}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Hồ sơ
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Đăng nhập
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`${isMenuOpen ? 'max-h-[400px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-[-10px]'}
          transform overflow-hidden transition-all duration-300 ease-in-out sm:hidden
          bg-white shadow-lg px-4 pt-3 pb-4 space-y-3`}
      >
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
        <Link to="/courses" onClick={() => setIsMenuOpen(false)}>Khóa học</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>Về chúng tôi</Link>
        <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>Yêu thích</Link>
        <Link to="/history" onClick={() => setIsMenuOpen(false)}>Lịch sử xem</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</Link>

        {isAuthenticated ? (
          <>
            <span className="block px-4 py-2 text-gray-700 font-medium">
              Xin chào, {getDisplayName()}
            </span>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Đăng nhập
          </Link>
        )}
      </nav>

      <UnderDevelopmentModal isOpen={showUndevelopedModal} onClose={() => setUndevelopedModal(false)} />
    </header>
  );
};

export default Header;