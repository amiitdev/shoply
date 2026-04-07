import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import useCartStore from '../features/cart/cartStore';
import useOrderStore from '../features/order/orderStore';
import axios from '../api/axios';
const Cart = () => {
  const navigate = useNavigate();

  const { cart, fetchCart, removeFromCart, updateCartItem } = useCartStore();

  const createOrder = useOrderStore((state) => state.createOrder);

  // 🧾 Total
  const totalPrice =
    cart?.items?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ) || 0;

  // 🚀 Checkout
  // const handleCheckout = async () => {
  //   if (!cart?.items || cart.items.length === 0) {
  //     toast.error('Cart is empty');
  //     return;
  //   }

  //   try {
  //     await createOrder({
  //       shippingAddress: {
  //         address: 'Patna',
  //         city: 'Patna',
  //         postalCode: '800001',
  //         country: 'India',
  //       },
  //     });

  //     toast.success('Order placed successfully!');
  //     navigate('/orders');
  //   } catch (error) {
  //     const msg = error?.response?.data?.message || 'Failed to place order';
  //     toast.error(msg);
  //   }
  // };

  const handleCheckout = async () => {
    if (!cart?.items || cart.items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    try {
      // 1️⃣ Create order (status = pending)
      const res = await createOrder({
        shippingAddress: {
          address: 'Patna',
          city: 'Patna',
          postalCode: '800001',
          country: 'India',
        },
      });

      const orderId = res.order._id;

      // 2️⃣ Call Stripe session API
      const stripeRes = await axios.post('/payment/create-checkout-session', {
        orderId,
      });

      // 3️⃣ Redirect to Stripe 💳
      window.location.href = stripeRes.data.url;
    } catch (error) {
      const msg = error?.response?.data?.message || 'Checkout failed';
      toast.error(msg);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ Empty state
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        🛒 Your cart is empty
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 🌟 HEADER */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Your Cart
        </h1>

        {/* 🛍️ ITEMS */}
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col md:flex-row items-center gap-4 border border-gray-800 rounded-xl p-4 bg-gray-900/60 backdrop-blur hover:shadow-purple-500/10 transition"
          >
            {/* 🖼️ IMAGE */}
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            {/* 📄 INFO */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-semibold text-lg">{item.product.name}</h2>
              <p className="text-gray-400">₹{item.product.price}</p>
            </div>

            {/* ➕➖ QUANTITY */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateCartItem(
                    item.product._id,
                    Math.max(1, item.quantity - 1),
                  )
                }
                className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
              >
                -
              </button>

              <span className="px-3">{item.quantity}</span>

              <button
                onClick={() =>
                  updateCartItem(item.product._id, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
              >
                +
              </button>
            </div>

            {/* 💰 ITEM TOTAL */}
            <p className="font-semibold text-purple-400">
              ₹{item.product.price * item.quantity}
            </p>

            {/* ❌ REMOVE */}
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ))}

        {/* 💰 SUMMARY */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold text-pink-400">
            Total: ₹{totalPrice}
          </h2>

          <button
            onClick={handleCheckout}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 transition shadow-lg hover:shadow-purple-500/30"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
