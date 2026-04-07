import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminOrders from '../pages/AdminOrders';
import AdminLogin from '../components/AdminLogin';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/" element={<AdminLogin />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;
