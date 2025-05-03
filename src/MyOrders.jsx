import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const MyOrders = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.user?.id) {
      axios.get(`http://localhost:5000/api/orders/user/${auth.user.id}`)
        .then(res => setOrders(res.data))
        .catch(() => alert('Failed to fetch your orders'));
    }
  }, [auth]);

  if (!auth?.is_authenticated) {
    return <p className="text-center text-red-600 mt-6">Please log in to view your orders.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded p-4 shadow bg-white">
              <img
                src={`http://localhost:5000${order.image_url}`}
                alt={order.car_name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold">{order.car_name}</h3>
              <p>Total Price: <span className="text-green-600 font-bold">${order.total_price}</span></p>
              <p>Hours: {order.hours}</p>
              <p>Status: <span className={
                order.status === 'approved' ? 'text-green-600 font-semibold' :
                order.status === 'declined' ? 'text-red-600 font-semibold' :
                'text-yellow-600 font-semibold'
              }>
                {order.status}
              </span></p>
              <p className="text-xs text-gray-500 mt-2">Placed on: {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
