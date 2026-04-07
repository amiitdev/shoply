import { useEffect } from 'react';
import useOrderStore from '../features/order/orderStore';

const Orders = () => {
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🎨 Status color helper
  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'paid':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'pending':
      default:
        return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    }
  };

  // ❌ Empty state
  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        🧾 No orders yet
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white p-6">
      {/* 🌟 HEADER */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-gray-400 mt-1">Track and manage your purchases</p>
      </div>

      {/* 📦 ORDERS */}
      <div className="max-w-5xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-xl p-5 shadow-md hover:shadow-purple-500/10 transition"
          >
            {/* 🧾 TOP */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
              <h2 className="font-semibold text-sm text-gray-400">
                Order ID: {order._id}
              </h2>

              <span
                className={`text-xs px-3 py-1 rounded-full w-fit ${getStatusStyle(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* 💰 TOTAL */}
            <p className="mb-4 font-semibold text-lg text-pink-400">
              Total: ₹{order.totalPrice}
            </p>

            {/* 📦 ITEMS */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border border-gray-800 rounded-lg p-3 bg-gray-800/40"
                >
                  {/* 🖼️ IMAGE */}
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  {/* 📄 DETAILS */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-100">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* 💰 PRICE */}
                  <p className="font-semibold text-purple-400">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
