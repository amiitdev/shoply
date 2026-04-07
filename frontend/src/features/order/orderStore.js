import { create } from 'zustand';
import axios from '../../api/axios';

const useOrderStore = create((set) => ({
  orders: [],
  loading: false,
  error: null,

  //Create Order
  createOrder: async (data) => {
    try {
      set({ loading: true });
      const response = await axios.post('/orders', data);
      set({ loading: false });
      return response.data;
    } catch (error) {
      set({ loading: false, error: error.message });
    }
  },

  // 📥 Get My Orders
  fetchOrders: async () => {
    try {
      const response = await axios.get('/orders/my-orders');
      set({ orders: response.data });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export default useOrderStore;
