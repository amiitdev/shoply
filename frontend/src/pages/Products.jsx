import { useEffect, useState } from 'react';
import useProductStore from '../features/product/productStore';
import ProductCard from '../components/ProductCard';
import SkeletonGrid from '../components/SkeletonGrid';

const Products = () => {
  const {
    products,
    fetchProducts,
    loading,
    page,
    pages,
    categories,
    fetchCategories,
  } = useProductStore();

  // 🎯 Filters
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    maxPrice: '',
    page: 1,
  });

  // 🔍 Debounce search input
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: searchInput,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  // 🚀 Fetch products
  useEffect(() => {
    fetchProducts(filters);
  }, [filters]);

  // 📦 Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6">
      {/* 🌟 HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Explore Products
        </h1>
        <p className="text-gray-400 text-sm mt-1">Find what you love 🔥</p>
      </div>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search products..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full mb-6 px-4 py-2 bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
      />

      {/* 🎯 CATEGORY CHIPS */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilters({ ...filters, category: '', page: 1 })}
          className={`px-3 py-1 rounded-full text-sm ${
            !filters.category
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-400'
          }`}
        >
          All
        </button>

        {categories?.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilters({ ...filters, category: cat, page: 1 })}
            className={`px-3 py-1 rounded-full text-sm transition ${
              filters.category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🎚️ PRICE SLIDER */}
      <div className="mb-6">
        <label className="text-sm text-gray-400">
          Max Price: ₹{filters.maxPrice || 10000}
        </label>

        <input
          type="range"
          min="0"
          max="10000"
          value={filters.maxPrice || 10000}
          onChange={(e) =>
            setFilters({
              ...filters,
              maxPrice: e.target.value,
              page: 1,
            })
          }
          className="w-full mt-2"
        />
      </div>

      {/* 📦 PRODUCTS */}
      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.length > 0 ? (
            products.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No products found 😢
            </div>
          )}
        </div>
      )}

      {/* 📄 PAGINATION */}
      <div className="flex flex-wrap gap-2 mt-8 justify-center">
        {[...Array(pages || 1)].map((_, i) => (
          <button
            key={i}
            onClick={() => setFilters({ ...filters, page: i + 1 })}
            className={`px-4 py-1 rounded-md text-sm transition ${
              page === i + 1
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
