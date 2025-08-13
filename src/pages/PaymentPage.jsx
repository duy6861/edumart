// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation(); // Để lấy state được truyền từ navigate
  const navigate = useNavigate();
  const product = location.state?.product; // Lấy thông tin sản phẩm từ state

  const [paymentMethod, setPaymentMethod] = useState('cod'); // Mặc định là Tiền mặt
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Nếu không có sản phẩm trong state, chuyển hướng về trang chủ hoặc hiển thị lỗi
  useEffect(() => {
    if (!product) {
      console.warn("Không có thông tin sản phẩm để thanh toán. Chuyển hướng về trang chủ.");
      // Có thể hiển thị một thông báo thay vì điều hướng ngay lập tức
      // alert("Không tìm thấy thông tin khóa học để thanh toán.");
      // navigate("/");
    }
  }, [product, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Xóa lỗi khi người dùng bắt đầu nhập
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Họ tên là bắt buộc.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email là bắt buộc.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ.';
    }
    if (!formData.phone.trim()) tempErrors.phone = 'Số điện thoại là bắt buộc.';
    if (!formData.address.trim()) tempErrors.address = 'Địa chỉ là bắt buộc.';

    // Validate thẻ chỉ khi chọn phương thức thẻ
    if (paymentMethod === 'credit_card') {
      if (!formData.cardNumber.trim()) tempErrors.cardNumber = 'Số thẻ là bắt buộc.';
      if (!formData.cardExpiry.trim()) tempErrors.cardExpiry = 'Ngày hết hạn là bắt buộc.';
      if (!formData.cardCvc.trim()) tempErrors.cardCvc = 'Mã CVC là bắt buộc.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!product) return; // Không có sản phẩm thì không xử lý

    setIsProcessing(true);
    // Mô phỏng quá trình xử lý thanh toán
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);

    // Mô phỏng thanh toán thành công
    console.log("Thông tin thanh toán:", { ...formData, paymentMethod, product });
    alert(`Thanh toán cho "${product.name}" thành công bằng phương thức ${paymentMethod === 'cod' ? 'Tiền mặt khi nhận hàng' : 'Thẻ tín dụng'}!`);

    // Sau khi thanh toán thành công, có thể:
    // 1. Chuyển đến trang cảm ơn
    // 2. Xóa sản phẩm khỏi state nếu cần
    // 3. Cập nhật lại giỏ hàng nếu có

    // Ví dụ: Chuyển về trang chủ
    navigate("/");
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Lỗi</h2>
          <p className="text-gray-700 mb-4">Không tìm thấy thông tin khóa học để thanh toán.</p>
          <button
            onClick={() => navigate(-1)} // Quay lại trang trước
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition mr-2"
          >
            Quay lại
          </button>
          <button
            onClick={() => navigate("/")} // Về trang chủ
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Thanh toán</h1>

          {/* Tóm tắt sản phẩm */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Khóa học bạn đang mua:</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img src={product.image} alt={product.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded mr-0 sm:mr-4 mb-4 sm:mb-0" />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                <p className="text-green-600 font-bold text-xl mt-1">{product.price?.toLocaleString()} đ</p>
                <p className="text-gray-600 text-sm mt-1">Giáo viên: {product.teacher}</p>
              </div>
            </div>
          </div>

          {/* Form thanh toán */}
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin khách hàng</h2>

            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isProcessing}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="email@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isProcessing}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="0123456789"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng *</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                disabled={isProcessing}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
              ></textarea>
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Phương thức thanh toán */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Phương thức thanh toán</h2>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${paymentMethod === 'cod'
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Tiền mặt khi nhận hàng
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  disabled={isProcessing}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${paymentMethod === 'credit_card'
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Thẻ tín dụng
                </button>
              </div>

              {/* Chi tiết thẻ tín dụng (nếu chọn) */}
              {paymentMethod === 'credit_card' && (
                <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
                  <h3 className="text-base font-semibold text-gray-800 mb-3">Thông tin thẻ</h3>
                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Số thẻ *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      disabled={isProcessing}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn (MM/YY) *</label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        disabled={isProcessing}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="MM/YY"
                      />
                      {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">Mã CVC *</label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        disabled={isProcessing}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 ${errors.cardCvc ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="123"
                      />
                      {errors.cardCvc && <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tổng kết và nút thanh toán */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="text-gray-600">Tổng tiền:</p>
                <p className="text-xl font-bold text-green-600">{product.price?.toLocaleString()} đ</p>
              </div>
              <button
                type="submit"
                disabled={isProcessing || !product}
                className={`mt-4 sm:mt-0 w-full sm:w-auto py-3 px-6 rounded-md text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors flex items-center justify-center ${isProcessing || !product ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  `Thanh toán ${product.price?.toLocaleString()} đ`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
