import React from 'react';
import useAuthStore from '../features/auth/authStore';

const Home = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {user?.name}</h1>

      <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2">
        Logout
      </button>
    </div>
  );
};

export default Home;
