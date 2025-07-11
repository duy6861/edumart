// src/pages/ProductDetail.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://mock-english-api.onrender.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
        <p className="text-gray-500 mt-4">Đang tải...</p>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-red-500">Sản phẩm không tồn tại.</p>;
  }

  return (
    <div className="bg-white rounded shadow p-6 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
        <button
          onClick={() => window.history.back()}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
      />

      {/* Teacher */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Giáo viên</h3>
        <p className="text-gray-600">{product.teacher}</p>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Mô tả ngắn</h3>
        <p className="text-gray-600">{product.shortDesc}</p>
      </div>

      {/* Long Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Thông tin chi tiết</h3>
        <p className="text-gray-600">{product.longDesc}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <p className="text-xl font-bold text-green-600">{product.price.toLocaleString()} đ</p>
      </div>

      {/* Action Button */}
      <button
        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-semibold"
        onClick={() => alert('Đặt hàng thành công!')}
      >
        Đặt hàng ngay
      </button>
    </div>
  );
};

export default ProductDetail;