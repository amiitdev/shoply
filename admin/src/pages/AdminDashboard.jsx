import { useEffect } from 'react';
import useOrderStore from '../features/order/orderStore';

const AdminDashboard = () => {
  const {
    orders = [],
    fetchAllOrders,
    updateOrderStatus,
    loading,
  } = useOrderStore();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // 💰 Total Revenue
  const totalRevenue =
    orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0) || 0;

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <div className="p-4 sm:p-6 text-white max-w-7xl mx-auto space-y-6">
      {/* 🔥 HEADER */}
      <h1 className="text-2xl sm:text-3xl font-bold">📊 Admin Dashboard</h1>

      {/* 📊 STATS */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Orders" value={orders.length} color="purple" />
        <StatCard title="Revenue" value={`₹${totalRevenue}`} color="green" />
        <StatCard title="Pending" value={pendingCount} color="yellow" />
      </div>

      {/* 📦 ORDERS TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">📦 Recent Orders</h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400">No orders found</p>
        ) : (
          <table className="w-full text-sm min-w-[700px]">
            {/* 🧾 HEAD */}
            <thead className="text-gray-400 border-b border-gray-800">
              <tr>
                <th className="text-left py-2">User</th>
                <th className="text-left py-2">Items</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            {/* 📄 BODY */}
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-800 hover:bg-gray-800/40 transition"
                >
                  {/* 👤 USER */}
                  <td className="py-3">
                    <div className="font-medium">
                      {order.user?.name || 'Unknown'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {order.user?.email}
                    </div>
                  </td>

                  {/* 📦 ITEMS */}
                  <td className="py-3 space-y-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {/* 🖼️ IMAGE */}
                        <img
                          src={item.product?.image}
                          alt=""
                          className="w-8 h-8 object-cover rounded"
                        />

                        {/* 📦 NAME */}
                        <span className="text-xs">
                          {item.quantity} × {item.product?.name || 'Product'}
                        </span>
                      </div>
                    ))}
                  </td>

                  {/* 💰 TOTAL */}
                  <td className="py-3 font-semibold">₹{order.totalPrice}</td>

                  {/* 🔄 STATUS DROPDOWN */}
                  <td className="py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className={`text-xs px-2 py-1 rounded border ${
                        order.status === 'pending'
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : order.status === 'paid'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                            : 'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}
                    >
                      <option value="pending">🟡 Pending</option>
                      <option value="paid">🔵 Paid</option>
                      <option value="delivered">🟢 Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

// 🎯 STAT CARD
const StatCard = ({ title, value, color }) => {
  const colors = {
    purple: 'from-purple-500 to-indigo-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
  };

  return (
    <div
      className={`p-5 rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
};
