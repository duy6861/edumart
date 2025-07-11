// src/hooks/useViewHistory.js
import { useState, useEffect } from 'react';

export const useViewHistory = () => {
  const [history, setHistory] = useState([]);

  // Load từ localStorage khi component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('viewHistory')) || [];
    setHistory(savedHistory);
  }, []);

  // Thêm sản phẩm vào lịch sử xem
  const addToViewHistory = (product) => {
    setHistory((prev) => {
      const exists = prev.some(item => item.id === product.id);

      let updated;

      if (exists) {
        // Di chuyển lên đầu nếu đã tồn tại
        updated = [product, ...prev.filter(item => item.id !== product.id)];
      } else {
        updated = [product, ...prev];
      }

      // Giới hạn số lượng tối đa (ví dụ: 20 mục)
      updated = updated.slice(0, 20);

      localStorage.setItem('viewHistory', JSON.stringify(updated));
      return updated;
    });
  };

  // Xóa toàn bộ lịch sử
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('viewHistory');
  };

  return {
    history,
    addToViewHistory,
    clearHistory,
  };
};