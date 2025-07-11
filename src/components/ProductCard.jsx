import { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

// ✅ Nhận toggleWishlist và isInWishlist từ props
export default function ProductCard({ product, toggleWishlist, isInWishlist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
        {/* Nút yêu thích */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md"
          aria-label="Yêu thích"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.95l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <div className="relative h-48 overflow-hidden" onClick={openModal}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
          />
        </div>

        <div className="p-4 flex flex-col h-[220px] justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 h-12">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-12">{product.shortDesc}</p>
          </div>
          <div>
            <p className="text-green-600 font-bold text-lg mb-3">
              {product.price.toLocaleString()} đ
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
              className="block w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      {/* Modal chi tiết sản phẩm */}
      <ProductDetailModal
        productId={product.id}
        isOpen={isModalOpen}
        onClose={closeModal}
        toggleWishlist={toggleWishlist}
        isInWishlist={isInWishlist}
      />
    </>
  );
}
