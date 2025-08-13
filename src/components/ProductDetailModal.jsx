import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useViewHistory } from '../hooks/useViewHistory';
import { useNavigate } from 'react-router-dom';
import UnderDevelopmentModal from './UnderDevelopmentModal';
Modal.setAppElement('#root');

export default function ProductDetailModal({ productId, isOpen, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Dùng riêng biệt với isOpen để delay render
  const [showUndevelopedModal, setUndevelopedModal] = useState(false);
  const [error, setError] = useState(null); // Thêm trạng thái lỗi
  const { addToViewHistory } = useViewHistory();
  const navigate = useNavigate(); //
  // Delay render modal để tránh chớp màn hình
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      const timer = setTimeout(() => {
        fetchProduct();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 300); // khớp với thời gian animate-fade-out
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://mock-english-api.onrender.com/products/${productId}`
      );

      // Kiểm tra nếu response không phải là JSON hợp lệ
      const text = await res.request.responseText;
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("API trả về không phải JSON");
      }

      setProduct(data);
      addToViewHistory(data);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  const handleOrderNow = () => {
    if (product) {
      onClose(); // Đóng modal trước
      // Điều hướng đến trang thanh toán, gửi thông tin sản phẩm qua state
      navigate('/checkout', { state: { product } });
    }
  };
  // Chỉ render modal khi showModal là true
  if (!showModal) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Chi tiết sản phẩm"
      className={`
        relative w-[90vw] sm:w-auto max-w-[400px] md:max-w-lg lg:max-w-xl
        mx-auto my-8 bg-white rounded-lg shadow-xl outline-none
        transform transition-all duration-300
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
      overlayClassName={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black bg-opacity-70
        ${isOpen ? "animate-fade-in" : "animate-fade-out"}
      `}
      closeTimeoutMS={300}
    >
      {/* Nút đóng - Luôn ở góc trên bên phải màn hình */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-50 text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Đóng"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Nội dung có thể cuộn */}
      <div className="max-h-[90vh] overflow-auto px-4 pt-6 pb-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-6">
            <p>{error}</p>
          </div>
        ) : (
          // Bao bọc toàn bộ nội dung chi tiết sản phẩm và nút đặt hàng trong một Fragment duy nhất
          <>
            {/* Tiêu đề */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            {/* Hình ảnh - Full width trên mobile */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[30vh] sm:h-[40vh] object-cover mb-4 rounded-lg"
            />

            {/* Thông tin sản phẩm */}
            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                Giáo viên
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {product.teacher}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                Mô tả ngắn
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {product.shortDesc}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                Thông tin chi tiết
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {product.longDesc}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-lg font-bold text-green-600">
                {product.price.toLocaleString()} đ
              </p>
            </div>

            {/* Nút "Đặt hàng ngay" nằm trong cùng Fragment này */}
            <button
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold"
              // onClick={() => setUndevelopedModal(true)} // Comment nếu dùng handleOrderNow
              onClick={handleOrderNow} // Dùng hàm điều hướng
            >
              Đặt hàng ngay
            </button>
          </> // Đóng Fragment cho phần nội dung khi không loading và không error
        )}
      </div> {/* Đóng div có thể cuộn */}

      {/* Modal - Tính năng đang phát triển */}
      <UnderDevelopmentModal
        isOpen={showUndevelopedModal}
        onClose={() => setUndevelopedModal(false)}
      />
    </Modal>
  );
}
