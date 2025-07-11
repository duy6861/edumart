// src/pages/HistoryPage.jsx
import React from 'react';
import ProductCardWishlist from '../components/ProductCardWishlist';
import { useViewHistory } from '../hooks/useViewHistory';

export default function HistoryPage() {
  const { history, clearHistory } = useViewHistory();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lịch sử xem gần đây</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-500 hover:text-red-700 underline"
          >
            Xóa lịch sử
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 italic">Bạn chưa xem sản phẩm nào.</p>
      ) : (
        <div className="space-y-4">
          {history.map(product => (
            <ProductCardWishlist key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}