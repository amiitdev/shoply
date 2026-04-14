import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../features/auth/authStore';
import { LayoutDashboard, Package, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300
     ${
       location.pathname === path
         ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white shadow-lg'
         : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
     }`;

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      {/* 🌌 DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>

          <nav className="flex flex-col gap-3">
            <Link to="/admin" className={linkClass('/admin')}>
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link to="/admin/products" className={linkClass('/admin/products')}>
              <Package size={18} />
              Products
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* 📱 MOBILE HEADER WITH HAMBURGER */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-black/60 backdrop-blur border-b border-gray-800 z-50">
        <h1 className="text-lg font-bold">Admin</h1>

        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* 📱 MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setOpen(false)}
        />

        {/* SIDEBAR PANEL */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-gray-900 p-6 transform transition-transform duration-300 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* CLOSE BUTTON */}
          <button className="mb-6" onClick={() => setOpen(false)}>
            <X size={26} />
          </button>

          <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

          <nav className="flex flex-col gap-3">
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className={linkClass('/admin')}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              onClick={() => setOpen(false)}
              className={linkClass('/admin/products')}
            >
              <Package size={18} />
              Products
            </Link>

            <button
              onClick={async () => {
                await handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </div>
      </div>

      {/* 📦 MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 mt-14 md:mt-0">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
