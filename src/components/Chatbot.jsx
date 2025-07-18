import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { keywordGroups } from '../data/keywords';

export default function Chatbot() {
  // Trạng thái mở / đóng chatbot
  const [isOpen, setIsOpen] = useState(false);
  // Nội dung tin nhắn người dùng nhập
  const [message, setMessage] = useState('');
  // Lịch sử cuộc trò chuyện
  const [chatHistory, setChatHistory] = useState([]);
  // Trạng thái đang load phản hồi AI
  const [loadingReply, setLoadingReply] = useState(false);
  // Ref để cuộn xuống khi có tin nhắn mới
  const chatContainerRef = useRef(null);

  // const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Toggle mở / đóng chatbot
  const toggleChat = () => setIsOpen(!isOpen);

  // Xử lý thay đổi nội dung ô input
  const handleInputChange = (e) => setMessage(e.target.value);

  // Xử lý gửi tin nhắn
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { type: 'user', text: message };
    setChatHistory((prev) => [...prev, newMessage]);
    setMessage('');
    setLoadingReply(true);

    // Giả lập phản hồi AI sau 1 giây
    setTimeout(() => {
      const response = getAIResponse(message);
      setChatHistory((prev) => [...prev, { type: 'ai', text: response.reply, products: response.products }]);
      setLoadingReply(false);
    }, 1000);
  };

  // Hàm tạo phản hồi AI dựa trên từ khóa và gợi ý khóa học phù hợp
  const getAIResponse = (input) => {
    input = input.toLowerCase();

    for (let group of keywordGroups) {
      if (group.keywords.test(input)) {
        const matchedProducts = products.filter((p) =>
          group.productIds.includes(parseInt(p.id))
        );
        let reply = 'Tôi tìm thấy một số khóa học phù hợp với bạn:';
        return { reply, products: matchedProducts };
      }
    }

    return {
      reply: 'Xin lỗi, tôi chưa hiểu rõ yêu cầu của bạn. Hãy thử lại! 😊',
      products: [],
    };
  };

  return (
    <>
      {/* Nút mở chatbot cố định góc dưới bên phải */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition z-40 pulse-scale"
        aria-label="Mở chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 012 2h-5l-5 5v-5H9z" />
        </svg>
      </button>

      {/* Giao diện khung chatbot */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 h-[32rem] flex flex-col bg-white shadow-xl rounded-t-lg overflow-hidden z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-semibold">Chatbot Antoree</span>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Khu vực nội dung trò chuyện */}
          <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 bg-gray-100 space-y-3">
            {/* Lời chào mặc định nếu chưa có lịch sử chat */}
            {chatHistory.length === 0 ? (
              <div className="text-sm text-gray-500 ">
                <span className='italic'>Chào bạn! Tôi là trợ lý AI của Antoree. Hãy hỏi điều bạn cần tìm</span> 😁
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div key={index} className={`p-3 rounded-md max-w-xs ${msg.type === 'user' ? 'ml-auto bg-green-100' : 'bg-white'} shadow-sm`}>
                  <strong>{msg.type === 'user' ? 'Bạn' : 'Antoree'}:</strong>
                  <p className="mt-1">{msg.text}</p>

                  {/* Hiển thị danh sách sản phẩm nếu có */}
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
              ))
            )}

            {/* Hiệu ứng loading khi đợi AI phản hồi */}
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

            {/* Trạng thái loading sản phẩm ban đầu hoặc lỗi */}
            {loading && (
              <p className="text-sm text-gray-400 italic">Đang tải sản phẩm...</p>
            )}
            {error && (
              <p className="text-sm text-red-500 italic">Lỗi khi tải sản phẩm: {error}</p>
            )}
          </div>

          {/* Khung nhập tin nhắn người dùng */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Nhập câu hỏi..."
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
