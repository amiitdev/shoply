// components/AdminLogin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdAdminPanelSettings,
} from 'react-icons/md';
import { FiShield } from 'react-icons/fi';
import useAuthStore from '../features/auth/authStore';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, user, loading, checkAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Animation mount effect
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  // Optional: check existing session on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    await login(formData);
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center font-['Inter',system-ui,sans-serif] bg-[#0a0a0f] overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0d0d1a] to-[#050508] overflow-hidden">
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-50 bg-indigo-600/30 top-[-150px] left-[-150px] animate-float"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-50 bg-purple-600/20 bottom-[-200px] right-[-150px] animate-float animation-delay-5000"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-50 bg-blue-600/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float animation-delay-10000"></div>
      </div>

      {/* Login Card */}
      <div
        className={`relative w-[460px] max-w-[90vw] bg-white/5 backdrop-blur-xl rounded-3xl p-10 px-9 border border-white/10 shadow-2xl transition-all duration-500 ease-out ${
          isMounted
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[30px]'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-9">
          <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-indigo-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center border border-purple-500/30 text-purple-400">
            <FiShield size={40} />
          </div>
          <h1 className="text-3xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight mb-2">
            Admin Access
          </h1>
          <p className="text-gray-500 text-sm font-normal">
            Secure portal · Restricted entry
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              <MdEmail size={18} className="text-gray-500" />
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={loading}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-gray-200 font-sans transition-all duration-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-black/50 placeholder:text-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide"
            >
              <MdLock size={18} className="text-gray-500" />
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                disabled={loading}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-sm text-gray-200 font-sans transition-all duration-200 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-black/50 placeholder:text-gray-600 disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-gray-500 cursor-pointer p-1 transition-colors duration-200 hover:text-purple-400"
              >
                {showPassword ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 border-none rounded-xl py-3.5 px-5 text-sm font-semibold text-white font-sans cursor-pointer transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-purple-500 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Authenticating...
              </>
            ) : (
              <>
                <MdAdminPanelSettings size={20} />
                Login as Admin
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center pt-5 border-t border-white/5">
          <p className="text-[11px] text-gray-600 tracking-wide font-normal">
            Restricted area · Authorized personnel only
          </p>
        </div>
      </div>

      {/* Custom Animations - Add to your global CSS or keep here with style tag */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }

        .animate-float {
          animation: float 20s infinite ease-in-out;
        }

        .animation-delay-5000 {
          animation-delay: 5s;
        }

        .animation-delay-10000 {
          animation-delay: 10s;
        }

        .bg-gradient-radial {
          background-image: radial-gradient(circle at 20% 30%, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
