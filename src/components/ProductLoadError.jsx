import React from 'react';

export default function ProductLoadError({ onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon lỗi - màu đỏ cảnh báo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-red-500 mb-4 animate-pulse"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {/* Tiêu đề lỗi */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Lỗi tải sản phẩm</h3>

      {/* Mô tả lỗi */}
      <p className="text-gray-500 mb-4 max-w-sm">
        Không thể tải danh sách sản phẩm. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.
      </p>

      {/* Nút thử lại */}
      <button
        onClick={onRetry || (() => window.location.reload())}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
      >
        Thử lại
      </button>
    </div>
  );
}