import useCartStore from '../features/cart/cartStore';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="group relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-800 hover:border-pink-500/40 shadow-lg hover:shadow-pink-500/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      {/* 🌈 TOP GLOW LINE */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-70 group-hover:opacity-100 transition" />

      {/* 🔥 IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* 🌌 Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* 🏷️ Category Badge */}
        {product.category && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600 text-xs px-3 py-1 rounded-full text-white shadow-md backdrop-blur">
            {product.category}
          </span>
        )}
      </div>

      {/* 🧾 CONTENT */}
      <div className="p-5 space-y-3">
        {/* 🏷️ NAME */}
        <h2 className="text-base font-semibold text-gray-100 group-hover:text-pink-400 transition line-clamp-1">
          {product.name}
        </h2>

        {/* 💰 PRICE + STOCK */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            ₹{product.price}
          </p>

          {product.stock > 0 ? (
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              In Stock
            </span>
          ) : (
            <span className="text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              Out of Stock
            </span>
          )}
        </div>

        {/* 🛒 BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product._id);
          }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95"
        >
          <FiShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      {/* ✨ GLOW BORDER */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none border border-pink-500/30 blur-[1px]" />
    </div>
  );
};

export default ProductCard;
