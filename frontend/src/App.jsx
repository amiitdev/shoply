import React, { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './features/auth/authStore';
import CustomToaster from './utils/CustomToaster';

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <CustomToaster />
      <AppRoutes />
    </div>
  );
};

export default App;
