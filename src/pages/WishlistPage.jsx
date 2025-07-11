import React from 'react';
import ProductCardWishlist from '../components/ProductCardWishlist';
import { useWishlist } from '../hooks/useWishlist';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Danh sách yêu thích</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 italic">Chưa có sản phẩm nào trong danh sách yêu thích.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((product) => (
            <ProductCardWishlist
              key={product.id}
              product={product}
              onRemoveFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}