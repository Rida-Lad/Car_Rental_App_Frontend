import { useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [accessCode, setAccessCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [orders, setOrders] = useState([]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/verify', { access_code: accessCode });
      if (res.data.is_admin) {
        setVerified(true);
        fetchOrders();
      } else {
        alert('Invalid access code');
      }
    } catch {
      alert('Error verifying access code');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders');
      setOrders(res.data);
    } catch {
      alert('Error fetching orders');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/orders/${id}/status`, { status });
      setOrders(prev => prev.map(order => (
        order.id === id ? { ...order, status } : order
      )));
    } catch {
      alert('Failed to update status');
    }
  };

  if (!verified) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Admin Access</h2>
        <form onSubmit={handleVerify} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Enter access code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Verify
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded shadow bg-white">
            <img src={`http://localhost:5000${order.image_url}`} alt={order.car_name} className="h-40 w-full object-cover mb-3 rounded" />
            <h3 className="text-lg font-semibold">{order.car_name}</h3>
            <p>By: {order.username}</p>
            <p>Hours: {order.hours}</p>
            <p>Total: <span className="font-bold">${order.total_price}</span></p>
            <p>Status: <span className={
              order.status === 'approved' ? 'text-green-600 font-bold' :
              order.status === 'declined' ? 'text-red-600 font-bold' :
              'text-yellow-600 font-bold'
            }>
              {order.status}
            </span></p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(order.id, 'approved')}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => updateStatus(order.id, 'declined')}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
