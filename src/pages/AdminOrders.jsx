import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('http://localhost:5000/api/admin/orders', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await res.json();
      setOrders(data);
    };
    fetchOrders();
  }, [user]);

  const updateStatus = async (orderId, status) => {
    await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({ status })
    });
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{order.model}</h3>
                <p>User: {order.email}</p>
                <p>Dates: {new Date(order.start_date).toLocaleDateString()} - {new Date(order.end_date).toLocaleDateString()}</p>
                <p>Total: ${order.total_price}</p>
                <p>Status: {order.status}</p>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => updateStatus(order.id, 'approved')}
                  className="block w-full bg-green-500 text-white px-3 py-1 rounded"
                  disabled={order.status === 'approved'}
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(order.id, 'declined')}
                  className="block w-full bg-red-500 text-white px-3 py-1 rounded"
                  disabled={order.status === 'declined'}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}