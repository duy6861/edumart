// src/components/ProductSuggestions.jsx
import React from 'react';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
import { useWishlist } from '../hooks/useWishlist';
export default function ProductSuggestions({ allProducts = [] }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [history, setHistory] = useState([]);
  const [currentWishlist, setWishlist] = useState([]);
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('viewHistory')) || [];
    setHistory(savedHistory);
    const saved = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(saved);
  }, []);
  // Lọc sản phẩm duy nhất theo id
  const uniqueProducts = (products) => {
    const seen = new Set();
    return products.filter(p => {
      const duplicate = seen.has(p.id);
      seen.add(p.id);
      return !duplicate;
    });
  };

  // Ghép wishlist + history làm nguồn gợi ý
  const combined = [...currentWishlist, ...history];
  const suggestedFromBehavior = uniqueProducts(combined).slice(0, 4);

  // Nếu chưa đủ 4 sản phẩm → bổ sung bằng sản phẩm ngẫu nhiên
  let finalSuggestions = [...suggestedFromBehavior];

  if (finalSuggestions.length < 4) {
    const remaining = allProducts.filter(
      p => !finalSuggestions.some(sp => sp.id === p.id)
    );
    const randomPool = [...remaining].sort(() => 0.5 - Math.random());
    finalSuggestions = [...finalSuggestions, ...randomPool.slice(0, 4 - finalSuggestions.length)];
  }

  if (finalSuggestions.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Gợi ý riêng cho bạn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {finalSuggestions.map(product => (
          <ProductCard key={product.id} product={product} toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist} />
        ))}
      </div>
    </div>
  );
}