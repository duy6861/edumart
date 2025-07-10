// src/components/ProductCard.jsx
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    // Bạn có thể thêm bất kỳ logic nào ở đây trước khi điều hướng
    console.log('Đang chuyển đến chi tiết sản phẩm:', product.id);

    // Điều hướng đến trang chi tiết sản phẩm
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4 flex flex-col h-[220px] justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2 h-12">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-12">
            {product.shortDesc}
          </p>
        </div>
        <div>
          <p className="text-green-600 font-bold text-lg mb-3">{product.price.toLocaleString()} đ</p>
          <button
            onClick={handleDetailClick}
            className="block w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}