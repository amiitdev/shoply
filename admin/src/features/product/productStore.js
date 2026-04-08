import { create } from 'zustand';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';
const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (filters = {}) => {
    try {
      set({ loading: true });

      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`/products?${query}`);

      // ✅ FIX HERE
      set({
        products: res.data.products || [],
        page: res.data.page || 1,
        pages: res.data.pages || 1,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false, products: [] });
    }
  },

  // ➕ Create
  createProduct: async (data) => {
    try {
      set({ loading: true });
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('stock', data.stock);
      //   Image file
      formData.append('image', data.image);
      const res = await axios.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // 🔄 Update UI instantly
      set((state) => ({
        products: [res.data, ...state.products],
        loading: false,
      }));
      toast.success('Product created successfully');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error creating product';

      set({ loading: false, error: msg });
      toast.error(msg);
    }
  },
  // ✏️ UPDATE PRODUCT
  updateProduct: async (id, data) => {
    try {
      set({ loading: true });
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      const res = await axios.put(`/products/${id}`, formData);
      // 🔄 Update UI
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? res.data : p)),
        loading: false,
      }));
      toast.success('Product updated');
    } catch (error) {
      const msg = error.response?.data?.message || 'Update failed';

      set({ loading: false });
      toast.error(msg);
    }
  }, // ❌ DELETE PRODUCT
  deleteProduct: async (id) => {
    try {
      await axios.delete(`/products/${id}`);

      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));

      toast.success('Product deleted');
    } catch (error) {
      const msg = error.response?.data?.message || 'Delete failed';

      toast.error(msg);
    }
  },
}));

export default useProductStore;
