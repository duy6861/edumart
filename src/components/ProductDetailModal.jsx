import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useViewHistory } from "../hooks/useViewHistory";
import UnderDevelopmentModal from "./UnderDevelopmentModal";
Modal.setAppElement("#root");

export default function ProductDetailModal({ productId, isOpen, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Dùng riêng biệt với isOpen để delay render
  const [showUndevelopedModal, setUndevelopedModal] = useState(false);
  const { addToViewHistory } = useViewHistory();

  // Delay render modal để tránh chớp màn hình
  // useEffect(() => {
  //   if (isOpen) {
  //     setShowModal(true);
  //     const timer = setTimeout(() => {
  //       fetchProduct();
  //     }, 50);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setShowModal(false);
  //   }
  // }, [isOpen]);
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
    try {
      const res = await axios.get(
        `https://mock-english-api.onrender.com/products/${productId}`
      );
      const data = res.data;
      setProduct(data);
      addToViewHistory(data);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    } finally {
      setLoading(false);
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
        mx-auto my-8 bg-white rounded-lg shadow-xl p-6 outline-none
        max-h-[90vh] overflow-auto transform transition-all duration-300
        ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
      overlayClassName={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black bg-opacity-70 ${
          isOpen ? "animate-fade-in" : "animate-fade-out"
        }
      `}
      closeTimeoutMS={300} // Thời gian timeout để đợi hiệu ứng kết thúc trước khi unmount
    >
      {/* Nội dung modal */}
      {loading ? (
        <div className="flex justify-center p-8">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Header - Tiêu đề + nút đóng */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {product.name}
            </h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
          </div>

          {/* Hình ảnh - Full width trên mobile */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[30vh] sm:h-[40vh] md:h-[50vh] object-cover mb-4 rounded-lg landscape-phone:h-[25vh] portrait:h-[35vh]"
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

          <button
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold"
            // onClick={() => alert('Đặt hàng thành công!')}
            onClick={() => setUndevelopedModal(true)}
          >
            Đặt hàng ngay
          </button>
        </>
      )}
      {/* Modal - Tính năng đang phát triển */}
      <UnderDevelopmentModal
        isOpen={showUndevelopedModal}
        onClose={() => setUndevelopedModal(false)}
      />
    </Modal>
  );
}
