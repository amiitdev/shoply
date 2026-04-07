import { Navigate } from 'react-router-dom';
import useAuthStore from '../features/auth/authStore';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthChecked } = useAuthStore();

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
