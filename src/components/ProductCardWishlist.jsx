import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

export default function ProductCardWishlist({ product, onRemoveFromWishlist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)} // Mở modal khi click vào card
        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-lg transition-shadow duration-300"
      >
        {/* Hình ảnh */}
        <div className="md:w-40 h-48 md:h-auto bg-gray-200 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nội dung */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.shortDesc}</p>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-green-600 font-bold">{product.price.toLocaleString()} đ</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn modal mở khi click vào nút "Xóa"
                onRemoveFromWishlist(product.id);
              }}
              className="text-red-500 hover:text-red-700 transition-colors duration-200"
              aria-label="Xóa khỏi yêu thích"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Chi tiết */}
      <ProductDetailModal
        productId={product.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}