import { useState } from "react";
import { Link } from "react-router-dom";
import UnderDevelopmentModal from './UnderDevelopmentModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUndevelopedModal, setUndevelopedModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // Thay group-hover bằng state

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          <Link to="/">Antoree</Link>
        </div>

        {/* Desktop Navigation (Hiển thị cho tablet và desktop) */}
        <nav className="hidden sm:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-green-600">Trang chủ</Link>
          <Link to="/courses" className="text-gray-700 hover:text-green-600">Khóa học</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">Về chúng tôi</Link>
          <Link to="/wishlist" className="text-gray-700 hover:text-green-600">Yêu thích</Link>

          {/* Lịch sử xem với tooltip tương thích iPad */}
          <div className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(prev => !prev)}
          >
            <Link to="/history" className="text-gray-700 hover:text-green-600 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>

            {/* Tooltip tương thích iPad/tablet */}
            <div className={`${showTooltip ? 'opacity-100' : 'opacity-0'} 
                            absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 
                            bg-gray-800 text-white text-xs rounded transition-opacity duration-200 
                            pointer-events-none whitespace-nowrap z-20`}>
              Sản phẩm đã xem
            </div>
          </div>

          <Link to="/contact" className="text-gray-700 hover:text-green-600">Liên hệ</Link>
          <button onClick={() => setUndevelopedModal(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Đăng nhập
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation với Animation (tăng max-h để phù hợp iPad) */}
      <nav
        className={`${isMenuOpen ? 'max-h-[400px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-[-10px]'}
          transform overflow-hidden transition-all duration-300 ease-in-out sm:hidden
          bg-white shadow-lg px-4 pt-3 pb-4 space-y-3`}
      >
        <Link
          to="/"
          className="block text-gray-700 hover:text-green-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Trang chủ
        </Link>
        <Link
          to="/courses"
          className="block text-gray-700 hover:text-green-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Khóa học
        </Link>
        <Link
          to="/about"
          className="block text-gray-700 hover:text-green-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Về chúng tôi
        </Link>
        <Link
          to="/wishlist"
          className="block text-gray-700 hover:text-green-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Yêu thích
        </Link>
        <Link
          to="/history"
          className="block text-gray-700 hover:text-green-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Lịch sử xem
        </Link>
        <Link
          to="/contact"
          className="block text-gray-700 hover:text-green-600"
          onClick={() => setIsMenuOpen(false)}
        >
          Liên hệ
        </Link>
        <button onClick={() => setUndevelopedModal(true)} className="w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Đăng nhập
        </button>
      </nav>

      {/* Modal - Tính năng đang phát triển */}
      <UnderDevelopmentModal isOpen={showUndevelopedModal} onClose={() => setUndevelopedModal(false)} />
    </header>
  );
};

export default Header;