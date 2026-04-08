// import { Navigate } from 'react-router-dom';
// import useAuthStore from '../features/auth/authStore';

// const ProtectedRoute = ({ children }) => {
//   const { user, isAuthChecked } = useAuthStore();

//   if (!isAuthChecked) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../features/auth/authStore';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthChecked, checkAuth } = useAuthStore();

  useEffect(() => {
    if (!isAuthChecked) {
      checkAuth();
    }
  }, [isAuthChecked]);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
