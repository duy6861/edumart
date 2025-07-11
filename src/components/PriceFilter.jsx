import React from 'react';

export default function PriceFilter({ priceFilter, onPriceFilterChange }) {
  const filters = [
    { value: 'all', label: 'Tất cả' },
    { value: 'under500k', label: 'Dưới 500.000đ' },
    { value: '500kTo1m', label: '500.000đ - 1.000.000đ' },
    { value: 'over1m', label: 'Trên 1.000.000đ' },
  ];

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Chọn mức giá</label>
      <div className="flex flex-wrap gap-2">
        {filters.map((option) => (
          <button
            key={option.value}
            onClick={() => onPriceFilterChange(option.value)}
            className={`px-4 py-2 rounded-full border transition-all duration-200 ${priceFilter === option.value
              ? 'bg-green-100 text-green-700 border-green-500'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}