import { create } from 'zustand';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isAuthChecked: false,
  error: null,

  //Register function
  register: async (data) => {
    try {
      set({ loading: true });
      const response = await axios.post('/auth/register', data);
      set({ user: response.data.newUser, loading: false });
      toast.success(response.data.message);
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
      toast.error(error.response.data.message);
    }
  },

  //Login function
  login: async (data) => {
    try {
      const response = await axios.post('/auth/login', data);
      set({ user: response.data.user, loading: false });
      toast.success(response.data.message);
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
      toast.error(error.response.data.message);
    }
  },

  //Logout function
  logout: async () => {
    try {
      const response = await axios.post('/auth/logout');
      set({ user: null, isAuthChecked: false });
      // 🔥 verify with backend

      toast.success(response.data.message);
      await useAuthStore.getState().checkAuth();
    } catch (error) {
      set({ error: error.response.data.message });
    }
  },

  //Check auth status
  checkAuth: async () => {
    try {
      const response = await axios.get('/auth/me');
      set({ user: response.data.user, isAuthChecked: true, loading: false });
    } catch (error) {
      set({ isAuthChecked: true, loading: false });
      toast.error(error.response.data.message);
    }
  },
}));

export default useAuthStore;
