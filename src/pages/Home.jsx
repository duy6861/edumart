// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}

      {products.length === 0 && (
        <p className="col-span-full text-center text-gray-500">Không có sản phẩm nào.</p>
      )}
    </div>
  );
}

// Skeleton loading component
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded shadow p-4 animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}