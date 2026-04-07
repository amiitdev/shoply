// import { create } from 'zustand';
// import axios from '../../api/axios';
// import { toast } from 'react-hot-toast';

// const useProductStore = create((set) => ({
//   products: [],
//   loading: false,
//   error: null,
//   fetchProducts: async () => {
//     try {
//       set({ loading: true, error: null });
//       const response = await axios.get('/products');
//       set({ products: response.data, loading: false });
//       toast.success('Products fetched successfully');
//     } catch (error) {
//       set({ error: error.message, loading: false });
//       toast.error(error.response?.data?.message || 'Failed to fetch products');
//     }
//   },
// }));

// export default useProductStore;

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
