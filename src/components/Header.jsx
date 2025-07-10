// Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Nếu bạn dùng React Router

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-green-600">
          <Link to="/">Antoree</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-700 hover:text-green-600">Trang chủ</Link>
          <Link to="/courses" className="text-gray-700 hover:text-green-600">Khóa học</Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">Về chúng tôi</Link>
          <Link to="/contact" className="text-gray-700 hover:text-green-600">Liên hệ</Link>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Đăng nhập
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {/* Burger Icon */}
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg px-4 py-3 space-y-3">
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
            to="/contact"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Liên hệ
          </Link>
          <button className="w-full text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            Đăng nhập
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;