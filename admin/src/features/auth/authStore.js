import { create } from 'zustand';
import axios from '../../api/axios';
import { toast } from 'react-hot-toast';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // 🔐 LOGIN
  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post('/auth/login', data);

      const user = res.data.user;

      // 👑 Admin check
      if (user.role !== 'admin') {
        toast.error('Only admin can login');
        set({ loading: false, user: null });
        return;
      }

      set({ user, loading: false });
      toast.success('Admin login successful');
    } catch (error) {
      console.log(error.response?.data);
      const msg = error.response?.data?.message || error.message;

      set({ error: msg, loading: false });
      toast.error(msg);
    }
  },

  // 🔄 CHECK AUTH
  checkAuth: async () => {
    try {
      set({ loading: true });

      const res = await axios.get('/auth/me');

      const user = res.data.user;

      if (user.role === 'admin') {
        set({ user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      set({ user: null, loading: false });
    }
  },

  // 🚪 LOGOUT
  logout: async () => {
    try {
      await axios.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        },
      );

      set({ user: null });
      toast.success('Logged out');
    } catch (error) {
      toast.error('Logout failed');
    }
  },
}));

export default useAuthStore;
