import { create } from 'zustand';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';

const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  // 📥 GET MY ORDERS (user)
  fetchOrders: async () => {
    try {
      const res = await axios.get('/orders/my-orders');
      set({
        orders: res.data || [],
        loading: false,
      });
    } catch (error) {
      const msg = error.response?.data?.message || error.message;

      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },
  // 📥 GET ALL ORDERS (admin)

  fetchAllOrders: async () => {
    try {
      set({ loading: true });
      const res = await axios.get('/orders');
      set({
        orders: res.data || [],
        loading: false,
      });
    } catch (error) {
      const msg = error.response?.data?.message || error.message;

      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },
  // ➕ CREATE ORDER
  createOrder: async (data) => {
    try {
      set({ loading: true });
      const res = axios.post('/orders', data);
      set((state) => ({
        orders: [res.data.order, ...state.orders],
        loading: false,
      }));
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || error.message;

      set({ error: msg, loading: false });
      throw error;
    }
  },

  // 🔄 UPDATE ORDER STATUS (admin)
  updateOrderStatus: async (orderId, status) => {
    try {
      const res = await axios.put(`/orders/${orderId}/status`, {
        status,
      });
      set((state) => ({
        orders: state.orders.map((o) =>
          o._id === orderId ? res.data.order : o,
        ),
      }));

      toast.success('Order updated');
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
    }
  },
}));

export default useOrderStore;
