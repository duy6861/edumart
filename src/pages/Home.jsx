import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../api/productSlice';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import PriceFilter from '../components/PriceFilter';
import Pagination from '../components/Pagination';
import { useWishlist } from '../hooks/useWishlist';
import ProductLoadError from '../components/ProductLoadError';
import NoProductsFound from '../components/NoProductsFound';
import ProductSuggestions from '../components/ProductSuggestions';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { removeVietnameseTones } from '../data/keywords';

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const productsPerPage = 12;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { toggleWishlist, isInWishlist } = useWishlist();

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    applyFilters(products, priceFilter, searchTerm);
  }, [products, priceFilter, searchTerm]);

  const applyFilters = (data, priceFilter, search) => {
    let filtered = [...data];
    if (search) {
      const normalizedSearch = removeVietnameseTones(search.toLowerCase());
      filtered = filtered.filter((p) => {
        const normalizedName = removeVietnameseTones(p.name.toLowerCase());
        return normalizedName.includes(normalizedSearch);
      });
    }

    if (priceFilter === 'under500k') {
      filtered = filtered.filter((p) => p.price < 500000);
    } else if (priceFilter === '500kTo1m') {
      filtered = filtered.filter((p) => p.price >= 500000 && p.price <= 1000000);
    } else if (priceFilter === 'over1m') {
      filtered = filtered.filter((p) => p.price > 1000000);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
    scrollToTop();
  };

  const handleSearchTermChange = (term) => {
    setSearchTerm(term);
  };

  const handlePriceFilterChange = (filter) => {
    setPriceFilter(filter);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setPriceFilter('all');
    setFilteredProducts(products);
    setCurrentPage(1);
    scrollToTop();
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="mb-8">
      {/* Tìm kiếm và lọc */}
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
        ) : error ? (
          <ProductLoadError onRetry={() => dispatch(fetchProducts())} />
        ) : filteredProducts.length === 0 ? (
          <NoProductsFound onClearFilters={handleClearFilters} />
        ) : (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              toggleWishlist={toggleWishlist}
              isInWishlist={isInWishlist}
            />
          ))
        )}
      </div>

      {/* Phân trang */}
      {!loading && filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            scrollToTop();
          }}
        />
      )}

      {/* Gợi ý */}
      {!loading && products.length > 0 && (
        <ProductSuggestions allProducts={products} />
      )}
    </div>
  );
}
