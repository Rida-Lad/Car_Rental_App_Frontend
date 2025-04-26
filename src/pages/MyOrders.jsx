import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded">
            <div className="flex items-center gap-4">
              <img src={order.image_url} alt={order.model} className="w-32 h-32 object-cover" />
              <div>
                <h3 className="text-xl font-bold">{order.model}</h3>
                <p>Dates: {new Date(order.start_date).toLocaleDateString()} - {new Date(order.end_date).toLocaleDateString()}</p>
                <p>Total: ${order.total_price}</p>
                <p className={`badge ${order.status === 'approved' ? 'bg-green-500' : 
                              order.status === 'declined' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                  {order.status}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}