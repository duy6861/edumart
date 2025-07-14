import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Cập nhật localStorage khi wishlist thay đổi
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Thêm sản phẩm vào wishlist nếu chưa tồn tại
  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (!exists) {
        // console.log('✅ Đã thêm vào wishlist:', product.name);
        return [...prev, product];
      }
      return prev;
    });
  };

  // Xoá sản phẩm khỏi wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prev => {
      const updated = prev.filter(item => item.id !== productId);
      // console.log('Đã xoá khỏi wishlist ID:', productId);

      return updated;
    });
    toast.info('Đã xóa khỏi danh sách yêu thích');
  };

  // Toggle thêm / xoá sản phẩm khỏi wishlist
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        // console.log('Đã bỏ yêu thích:', product.name);
        return prev.filter(item => item.id !== product.id);
      } else {
        // console.log('Đã thêm vào wishlist:', product.name);
        return [...prev, product];
      }
    });
    if (!isInWishlist(product.id)) {
      toast.info('Thêm sản phẩm vào danh sách yêu thích');
    }
  };

  // Kiểm tra sản phẩm đã có trong wishlist chưa
  const isInWishlist = (productId) => {
    const result = wishlist.some(item => item.id === productId);
    // console.log(`🔍 ${result ? 'Có' : 'Không'} trong wishlist:`, productId);
    return result;
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
};
