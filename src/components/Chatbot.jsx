// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { keywordGroups, removeVietnameseTones } from '../data/keywords';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingReply, setLoadingReply] = useState(false);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);
  const { products, loading, error } = useSelector((state) => state.products);

  // Lời chào mặc định
  const initialGreeting = "Chào bạn! Mình là trợ lý AI của Antoree. Bạn cần học tiếng Anh về chủ đề gì? Mình có thể giúp bạn tìm khóa học phù hợp! 😊";
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [chatHistory]);
  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    const newMessage = { type: 'user', text: userMessage };
    setChatHistory((prev) => [...prev, newMessage]);
    setMessage('');
    setLoadingReply(true);

    // Xử lý phản hồi AI sau 1 giây
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setChatHistory((prev) => [...prev, response]);
      setLoadingReply(false);
    }, 2000);
  };
  /**
  * Hàm xử lý và tạo phản hồi cho người dùng dựa trên tin nhắn họ nhập vào.
  * 
  * @param {string} input - Tin nhắn người dùng gửi đến chatbot (ví dụ: "tôi muốn học phát âm")
  * @returns {Object} - Một đối tượng chứa: loại tin nhắn, nội dung phản hồi và danh sách sản phẩm gợi ý (nếu có)
  */
  const getAIResponse = (input) => {
    // Bước 1: Chuẩn hóa đầu vào
    // - Chuyển thành chữ thường để không phân biệt hoa/thường
    // - Loại bỏ dấu tiếng Việt (ví dụ: "y tế" → "y te") để tăng khả năng so khớp
    const normalizedInput = removeVietnameseTones(input.toLowerCase());

    // Bước 2: Duyệt qua từng nhóm từ khóa đã định nghĩa trong keywords.js
    for (let group of keywordGroups) {
      // Kiểm tra xem tin nhắn đã chuẩn hóa có chứa từ khóa nào trong nhóm này không
      // Ví dụ: nếu người dùng nhập "học phát âm", thì sẽ khớp với nhóm có regex /phát âm|pronunciation|.../
      if (group.keywords.test(normalizedInput)) {

        // Nếu có khớp, tìm các sản phẩm liên quan trong danh sách hiện tại
        // group.productIds: danh sách ID khóa học liên quan đến chủ đề này
        // parseInt(p.id): đảm bảo ID sản phẩm là số nguyên để so sánh chính xác
        const matchedProducts = products.filter(p => group.productIds.includes(parseInt(p.id)));

        // Chọn ngẫu nhiên một câu trả lời thân thiện từ danh sách reply đã định nghĩa
        // Giúp chatbot không trả lời cứng nhắc, lặp đi lặp lại
        const reply = group.replies[Math.floor(Math.random() * group.replies.length)];

        // Tạo phần bổ sung thông báo có bao nhiêu khóa học phù hợp
        // Nếu có sản phẩm phù hợp: thêm "Có 3 khóa học phù hợp."
        // Nếu không có: chuỗi rỗng
        const productsText = matchedProducts.length > 0
          ? ` Có ${matchedProducts.length} khóa học phù hợp.`
          : '';

        // Trả về phản hồi hoàn chỉnh
        return {
          type: 'ai',           // Xác định đây là tin nhắn từ chatbot (AI)
          text: reply + productsText, // Nội dung: câu trả lời + thông báo số lượng khóa học
          products: matchedProducts   // Danh sách sản phẩm gợi ý để hiển thị
        };
      }
    }

    // Bước 3: Nếu KHÔNG CÓ nhóm từ khóa nào khớp (không hiểu câu hỏi)
    // Chuẩn bị một số phản hồi mặc định thân thiện để hướng dẫn người dùng
    const fallbackReplies = [
      "Mình chưa hiểu rõ yêu cầu của bạn. Bạn có thể nói rõ hơn về chủ đề bạn muốn học không? Ví dụ: giao tiếp, TOEIC, phát âm,... 😊",
      "Bạn muốn học tiếng Anh để làm gì ạ? Mình có thể gợi ý khóa học nếu bạn nói rõ mục tiêu nhé!",
      "Hãy thử nhập: 'khóa học TOEIC', 'luyện phát âm', 'giao tiếp hàng ngày' để mình giúp bạn nhanh hơn nhé!",
      "Bạn có muốn học kỹ năng nghe, nói, đọc hay viết trước không? Nhập thử 'nghe', 'nói' để mình hiểu hơn.",
      "Bạn muốn luyện từ vựng, phát âm hay giao tiếp? Gõ từ khóa chủ đề bạn quan tâm nhé!",
      "Nếu bạn chưa biết nên học cái gì, bạn có thể nhập từ “giao tiếp”, “IELTS”, “phát âm” để mình gợi ý.",
      "Bạn muốn học tiếng Anh theo chủ đề nào? Ví dụ: du lịch, công việc, học thuật…",
      "Bạn đang muốn học TOEIC, IELTS hay tiếng Anh giao tiếp? Nhập từ khóa đó để mình biết bạn cần gì hơn.",
      "Bạn có thể thử nói chủ đề bạn muốn: “giao tiếp”, “phát âm chuẩn”, “nghe tiếng Anh”… Mình sẽ chọn khóa phù hợp cho bạn."
    ];

    // Chọn ngẫu nhiên một phản hồi mặc định để tránh lặp lại
    const randomFallback = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

    // Trả về phản hồi mặc định + danh sách sản phẩm rỗng
    return {
      type: 'ai',
      text: randomFallback,
      products: []
    };
  };
  return (
    <>
      {/* Nút mở chatbot - có animation */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition z-40 pulse-scale"
        aria-label="Mở chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 012 2h-5l-5 5v-5H9z" />
        </svg>
      </button>

      {/* Giao diện chatbot */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 h-[32rem] flex flex-col bg-white shadow-xl rounded-t-lg overflow-hidden z-50 border border-gray-200">
          <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">Chatbot Antoree</span>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 bg-gray-100 space-y-3">
            {chatHistory.length === 0 ? (
              <div className="text-sm text-gray-500 italic">
                {initialGreeting}
              </div>
            ) : (
              chatHistory.map((msg, index) => {
                const isLast = index === chatHistory.length - 1;

                return (
                  <div
                    key={index}
                    ref={isLast ? lastMessageRef : null}
                    className={`p-3 rounded-md max-w-xs ${msg.type === 'user' ? 'ml-auto bg-green-100' : 'bg-white'} shadow-sm`}
                  >
                    <strong>{msg.type === 'user' ? 'Bạn' : 'Antoree'}:</strong>
                    <p className="mt-1">{msg.text}</p>

                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {msg.products.map((product) => (
                          <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            onClick={toggleChat}
                            className="block border rounded p-2 bg-white shadow hover:shadow-md transition"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-20 object-cover mb-2 rounded"
                            />
                            <h4 className="font-medium text-xs sm:text-sm line-clamp-2 h-10">
                              {product.name}
                            </h4>
                            <p className="text-green-600 font-bold text-xs mt-1">
                              {product.price.toLocaleString()} đ
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {loadingReply && (
              <div className="bg-white p-3 rounded-md shadow-sm">
                <strong>Antoree:</strong>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}

            {loading && (
              <p className="text-sm text-gray-400 italic">Đang tải sản phẩm...</p>
            )}
            {error && (
              <p className="text-sm text-red-500 italic">Lỗi: {error}</p>
            )}
          </div>


          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Bạn cần học gì?"
                className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}