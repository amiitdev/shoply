import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      {/* 🖥️ DESKTOP SIDEBAR */}
      <div className="hidden md:flex w-64 bg-gray-900/80 backdrop-blur border-r border-gray-800 p-6 flex-col gap-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Admin
        </h1>

        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:text-pink-400 transition">
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="hover:text-purple-400 transition"
          >
            Products
          </Link>
          <Link to="/admin/orders" className="hover:text-indigo-400 transition">
            Orders
          </Link>
        </nav>
      </div>

      {/* 📱 MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-between items-center px-4 py-3 bg-black/70 backdrop-blur border-b border-gray-800 z-50">
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

        {/* PANEL */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-gray-900 p-6 transform transition-transform ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* CLOSE */}
          <button className="mb-6" onClick={() => setOpen(false)}>
            <X size={26} />
          </button>

          <h1 className="text-xl font-bold mb-6">Admin</h1>

          <nav className="flex flex-col gap-4">
            <Link to="/admin" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
            <Link to="/admin/products" onClick={() => setOpen(false)}>
              Products
            </Link>
            <Link to="/admin/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
          </nav>
        </div>
      </div>

      {/* 📦 MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-6 mt-14 md:mt-0">{children}</div>
    </div>
  );
};

export default AdminLayout;
