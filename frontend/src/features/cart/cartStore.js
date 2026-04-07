import { create } from 'zustand';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';

const useCartStore = create((set) => ({
  cart: null,
  loading: false,
  error: null,

  //Get Cart Items
  fetchCart: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axios.get('/cart');
      set({ cart: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  // ➕ Add to Cart
  addToCart: async (productId) => {
    try {
      await axios.post('/cart', { productId, quantity: 1 });
      // Refresh cart after adding item
      const response = await axios.get('/cart');
      console.log(response.data);
      set({ cart: response.data });
      console.log({ cart: response.data });
      toast.success('Item added to cart');
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      console.log(msg);
      set({ error: msg });
      toast.error(msg);
    }
  },

  // ❌ Remove from Cart
  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      // Refresh cart after removing item
      const response = await axios.get('/cart');
      set({ cart: response.data });
      toast.success('Item removed from cart');
    } catch (error) {
      set({ error: error.message });
      toast.error('Failed to remove item from cart');
    }
  },
  // Update Cart Item Quantity
  updateCartItem: async (productId, quantity) => {
    try {
      await axios.put(`/cart/${productId}`, { quantity });
      const response = await axios.get('/cart');
      set({ cart: response.data });
      toast.success('Cart updated');
    } catch (error) {
      set({ error: error.message });
      toast.error('Failed to update cart');
    }
  },

  // 🧹 Clear Cart
  clearCart: async () => {
    try {
      await axios.delete('/cart');
      set({ cart: { items: [] } });
      toast.success('Cart cleared');
    } catch (error) {
      set({ error: error.message });
      toast.error('Failed to clear cart');
    }
  },
}));

export default useCartStore;
