// src/components/NoProductsFound.jsx
export default function NoProductsFound({ onClearFilters }) {
  return (
    <div className="col-span-full text-center py-10 px-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mx-auto text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
      <p className="text-gray-500 mb-4 max-w-sm mx-auto">
        Không có sản phẩm nào phù hợp với bộ lọc của bạn.
      </p>
      <button
        onClick={onClearFilters}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
}