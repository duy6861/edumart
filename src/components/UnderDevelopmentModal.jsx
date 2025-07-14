// src/components/UnderDevelopmentModal.jsx
// import React, { useState } from 'react';
import Modal from 'react-modal';
// Cấu hình cơ bản cho react-modal
Modal.setAppElement('#root');

export default function UnderDevelopmentModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Tính năng đang phát triển"
      className="max-w-md w-full max-h-screen overflow-y-auto bg-white rounded-lg shadow-xl p-6 mx-auto my-8 outline-none transform transition-all duration-300"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div>
        {/* Tiêu đề */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">Tính năng đang được phát triển</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nội dung */}
        <div className="mb-6 text-gray-600">
          <p className="mb-4">
            Rất xin lỗi! Tính năng này vẫn đang trong quá trình xây dựng.
          </p>
          <p>
            Chúng tôi sẽ sớm hoàn thiện để mang đến trải nghiệm tốt nhất cho bạn.
          </p>
        </div>

        {/* Nút đóng */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
          >
            Đóng
          </button>
        </div>
      </div>
    </Modal>
  );
}