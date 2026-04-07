// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, Menu, X, Package } from 'lucide-react';
// import { useState } from 'react';
// import useCartStore from '../features/cart/cartStore';
// import useAuthStore from '../features/auth/authStore';

// const Navbar = () => {
//   const { cart } = useCartStore();
//   const { user, logout } = useAuthStore();
//   const navigate = useNavigate();

//   const [menuOpen, setMenuOpen] = useState(false);

//   // 🧮 total quantity
//   const count =
//     cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

//   return (
//     <>
//       {/* 🌌 NAVBAR */}
//       <div className="sticky top-0 z-50 backdrop-blur bg-black/60 border-b border-gray-800">
//         <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
//           {/* 🌈 LOGO */}
//           <h1
//             onClick={() => navigate('/')}
//             className="text-xl font-bold cursor-pointer bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
//           >
//             Shoply
//           </h1>

//           {/* 📱 RIGHT SIDE */}
//           <div className="flex items-center gap-4">
//             {/* 📦 ORDERS (DESKTOP ONLY) */}
//             {user && (
//               <Link
//                 to="/orders"
//                 className="hidden md:flex items-center gap-2 text-gray-300 hover:text-purple-400 transition"
//               >
//                 <Package size={20} />
//                 Orders
//               </Link>
//             )}

//             {/* 🛒 CART (ALWAYS VISIBLE) */}
//             <Link to="/cart" className="relative">
//               <ShoppingCart
//                 size={26}
//                 className="text-gray-300 hover:text-pink-400 transition"
//               />

//               {count > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] px-1.5 py-[2px] rounded-full animate-pulse">
//                   {count}
//                 </span>
//               )}
//             </Link>

//             {/* 🍔 HAMBURGER (MOBILE ONLY) */}
//             <button
//               className="md:hidden text-gray-300"
//               onClick={() => setMenuOpen(true)}
//             >
//               <Menu size={28} />
//             </button>

//             {/* 🖥️ DESKTOP MENU */}
//             <div className="hidden md:flex items-center gap-6">
//               {user && (
//                 <span className="text-sm text-gray-400">👋 {user.name}</span>
//               )}

//               {user ? (
//                 <button
//                   onClick={logout}
//                   className="text-sm px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <Link
//                   to="/login"
//                   className="px-4 py-1.5 rounded-md bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm"
//                 >
//                   Login
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 📱 MOBILE MENU */}
//       <div
//         className={`fixed inset-0 z-50 transition ${
//           menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
//         }`}
//       >
//         {/* 🌑 BACKDROP */}
//         <div
//           className="absolute inset-0 bg-black/60"
//           onClick={() => setMenuOpen(false)}
//         />

//         {/* 📦 SIDE PANEL */}
//         <div
//           className={`absolute right-0 top-0 h-full w-64 bg-gray-900 border-l border-gray-800 p-6 transform transition-transform ${
//             menuOpen ? 'translate-x-0' : 'translate-x-full'
//           }`}
//         >
//           {/* ❌ CLOSE */}
//           <button
//             className="mb-6 text-gray-400"
//             onClick={() => setMenuOpen(false)}
//           >
//             <X size={28} />
//           </button>

//           {/* 👤 USER */}
//           {user && <p className="text-gray-400 mb-6 text-sm">👋 {user.name}</p>}

//           {/* 🔗 LINKS */}
//           <div className="flex flex-col gap-5">
//             <Link
//               to="/"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-300 hover:text-white transition"
//             >
//               🏠 Home
//             </Link>

//             {/* 📦 ORDERS (MOBILE) */}
//             {user && (
//               <Link
//                 to="/orders"
//                 onClick={() => setMenuOpen(false)}
//                 className="text-gray-300 hover:text-purple-400 transition"
//               >
//                 📦 Orders
//               </Link>
//             )}

//             {/* 🛒 CART */}
//             <Link
//               to="/cart"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-300 hover:text-pink-400 transition"
//             >
//               🛒 Cart ({count})
//             </Link>

//             {user ? (
//               <button
//                 onClick={() => {
//                   logout();
//                   setMenuOpen(false);
//                 }}
//                 className="text-left text-red-400 hover:text-red-500"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 onClick={() => setMenuOpen(false)}
//                 className="text-gray-300 hover:text-white"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Package } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../features/cart/cartStore';
import useAuthStore from '../features/auth/authStore';

const Navbar = () => {
  const { cart } = useCartStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // 🧮 total quantity
  const count =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 },
    },
    tap: { scale: 0.95 },
  };

  const cartVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.9 },
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 15,
      },
    },
    exit: { scale: 0 },
  };

  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: { x: '100%' },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 300,
      },
    }),
  };

  return (
    <>
      {/* 🌌 NAVBAR */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 border-b border-purple-500/30 shadow-lg shadow-purple-500/10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* 🌈 LOGO */}
          <motion.h1
            onClick={() => navigate('/')}
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
            className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight"
          >
            Shoply
          </motion.h1>

          {/* 📱 RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* 📦 ORDERS (DESKTOP ONLY) */}
            {user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/orders"
                  className="hidden md:flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  <Package size={20} />
                  Orders
                </Link>
              </motion.div>
            )}

            {/* 🛒 CART (ALWAYS VISIBLE) */}
            <motion.div
              variants={cartVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/cart" className="relative block">
                <ShoppingCart
                  size={26}
                  className="text-gray-300 hover:text-pink-400 transition-colors duration-300"
                />

                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key="cart-badge"
                      variants={badgeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] px-1.5 py-[2px] rounded-full shadow-lg"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>

            {/* 🍔 HAMBURGER (MOBILE ONLY) */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={28} />
            </motion.button>

            {/* 🖥️ DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6">
              {user && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-purple-300"
                >
                  👋 {user.name}
                </motion.span>
              )}

              {user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="text-sm px-4 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-300 border border-red-500/30"
                >
                  Logout
                </motion.button>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-sm font-medium shadow-lg shadow-purple-500/30"
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 🌑 BACKDROP */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* 📦 SIDE PANEL */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-0 h-full w-80 z-50 bg-gradient-to-b from-slate-900 via-purple-900/95 to-slate-900 border-l border-purple-500/30 p-6 shadow-2xl shadow-purple-500/20"
            >
              {/* ❌ CLOSE */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="mb-8 text-gray-400 hover:text-purple-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <X size={28} />
              </motion.button>

              {/* 👤 USER */}
              {user && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-purple-300 mb-8 text-sm bg-purple-500/10 p-3 rounded-lg border border-purple-500/30"
                >
                  👋 {user.name}
                </motion.p>
              )}

              {/* 🔗 LINKS */}
              <div className="flex flex-col gap-5">
                {[
                  { to: '/', label: '🏠 Home', color: 'text-gray-300' },
                  ...(user
                    ? [
                        {
                          to: '/orders',
                          label: '📦 Orders',
                          color: 'text-purple-400',
                        },
                      ]
                    : []),
                  {
                    to: '/cart',
                    label: `🛒 Cart (${count})`,
                    color: 'text-pink-400',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 10 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={`${item.color} hover:text-white transition-colors duration-300 text-lg flex items-center gap-3`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {user ? (
                  <motion.button
                    custom={3}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-left text-red-400 hover:text-red-500 transition-colors duration-300 text-lg"
                  >
                    🚪 Logout
                  </motion.button>
                ) : (
                  <motion.div
                    custom={3}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ x: 10 }}
                  >
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-lg flex items-center gap-3"
                    >
                      🔑 Login
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
