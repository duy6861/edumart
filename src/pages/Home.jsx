// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import PriceFilter from '../components/PriceFilter';
import Pagination from '../components/Pagination';
import { useWishlist } from '../hooks/useWishlist';
import ProductLoadError from '../components/ProductLoadError';
import NoProductsFound from '../components/NoProductsFound'; // Đã thêm component mới

export default function Home() {
  const productsPerPage = 12;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { toggleWishlist, isInWishlist } = useWishlist();

  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://mock-english-api.onrender.com/products');
        const data = res.data;
        setProducts(data);
        applyFilters(data, priceFilter, searchTerm); // Áp dụng lại các bộ lọc sau khi load
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm:', err);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Hàm xử lý lọc chung
  const applyFilters = (data, priceFilter, search) => {
    let filtered = [...data];

    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priceFilter === 'under500k') {
      filtered = filtered.filter(p => p.price < 500000);
    } else if (priceFilter === '500kTo1m') {
      filtered = filtered.filter(p => p.price >= 500000 && p.price <= 1000000);
    } else if (priceFilter === 'over1m') {
      filtered = filtered.filter(p => p.price > 1000000);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên sau khi áp dụng bộ lọc
  };

  // Xử lý thay đổi từ khóa tìm kiếm
  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
    applyFilters(products, priceFilter, term);
  };

  // Xử lý thay đổi lựa chọn giá
  const handlePriceFilterChange = (filter) => {
    setPriceFilter(filter);
    applyFilters(products, filter, searchTerm);
  };

  // Tính toán sản phẩm theo trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="mb-8">
      {/* Thanh tìm kiếm & lọc giá */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-end">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearchTermChange} />
        <PriceFilter
          priceFilter={priceFilter}
          onPriceFilterChange={handlePriceFilterChange}
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {loading ? (
          [...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
        ) : filteredProducts.length === 0 && products.length === 0 ? (
          <ProductLoadError onRetry={() => window.location.reload()} />
        ) : filteredProducts.length === 0 && products.length > 0 ? (
          <NoProductsFound onClearFilters={() => {
            setSearchTerm('');
            setPriceFilter('all');
            applyFilters(products, 'all', '');
          }} />
        ) : currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              toggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist}
            />
          ))
        ) : null}
      </div>

      {/* Phân trang */}
      {!loading && filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

// Skeleton loading component
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}