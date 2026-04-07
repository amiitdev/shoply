import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import useCartStore from '../features/cart/cartStore';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ⚡ Skeleton loading
  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10 grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
        <div className="h-[400px] bg-gray-800 rounded-xl" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-800 rounded w-2/3" />
          <div className="h-4 bg-gray-800 rounded w-full" />
          <div className="h-4 bg-gray-800 rounded w-5/6" />
          <div className="h-6 bg-gray-800 rounded w-1/3" />
          <div className="h-10 bg-gray-800 rounded w-40" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-400">Product not found</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 🖼️ IMAGE */}
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl border border-gray-800">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* 🌈 Glow effect */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition border border-pink-500/30 blur-sm" />
        </div>

        {/* 📄 DETAILS */}
        <div className="space-y-5">
          {/* 🏷️ Name */}
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            {product.name}
          </h1>

          {/* 📄 Description */}
          <p className="text-gray-400 leading-relaxed">{product.description}</p>

          {/* 💰 Price */}
          <h2 className="text-3xl font-bold text-pink-400">₹{product.price}</h2>

          {/* 📦 Stock */}
          <div>
            {product.stock > 0 ? (
              <span className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                In Stock ({product.stock})
              </span>
            ) : (
              <span className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                Out of Stock
              </span>
            )}
          </div>

          {/* 🛒 BUTTON */}
          <button
            onClick={() => addToCart(product._id)}
            className="mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
