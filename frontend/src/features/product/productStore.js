import { create } from 'zustand';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
const useProductStore = create((set) => ({
  products: [],
  categories: [],
  loading: false,
  page: 1,
  pages: 1,

  fetchProducts: async (filters = {}) => {
    try {
      set({ loading: true });

      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`/products?${query}`);

      set({
        products: res.data.products,
        page: res.data.page,
        pages: res.data.pages,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    const res = await axios.get('/products/categories');
    set({ categories: res.data });
  },
}));
export default useProductStore;
