import React from 'react';

export default function SearchBar({ searchTerm, onSearch }) {
  return (
    <div>
      <label htmlFor="search" className="block text-gray-700 font-medium mb-2">Tìm khóa học</label>
      <div className="relative">
        <input
          id="search"
          type="text"
          placeholder="Nhập tên khóa học..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-3 px-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}