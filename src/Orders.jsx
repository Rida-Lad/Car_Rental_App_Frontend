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
      <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-3xl">
          <div className="flex flex-col items-center mb-8">
            <div className="h-12 w-12 bg-purple-800 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-black text-purple-900 mb-2">Admin Portal</h2>
            <p className="text-gray-600">Enter access code to continue</p>
          </div>
          <form onSubmit={handleVerify} className="space-y-8">
            <div className="relative">
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 transition-all placeholder-transparent peer"
                placeholder=" "
              />
              <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
                Access Code
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-800 text-white py-4 px-6 rounded-xl hover:bg-purple-900 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
            >
              Unlock Dashboard
              <span className="ml-2">→</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black text-purple-900">
            Order Management
            <span className="text-2xl ml-4 text-black font-medium">({orders.length} bookings)</span>
          </h1>
          <div className="flex items-center space-x-2 bg-purple-800 px-4 py-2 rounded-full">
            <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Admin Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map(order => (
            <div key={order.id} className="group bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-purple-100">
              <div className="relative overflow-hidden rounded-2xl mb-6 h-60">
                <img 
                  src={`http://localhost:5000${order.image_url}`} 
                  alt={order.car_name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                  <h3 className="text-2xl font-bold text-white">{order.car_name}</h3>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span className="font-medium text-black">{order.username}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-bold">
                    {order.hours}h
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-b border-gray-100 py-3">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-black text-purple-900">${order.total_price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    order.status === 'approved' ? 'bg-green-100 text-green-800' :
                    order.status === 'declined' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateStatus(order.id, 'approved')}
                  className="flex items-center justify-center space-x-2 bg-purple-800 text-white py-3 px-6 rounded-xl hover:bg-purple-900 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => updateStatus(order.id, 'declined')}
                  className="flex items-center justify-center space-x-2 bg-black text-white py-3 px-6 rounded-xl hover:bg-gray-800 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  <span>Decline</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;