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
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="mb-6 flex justify-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-purple-900 mb-4">Access Required</h2>
          <p className="text-gray-600 text-lg mb-6">Please sign in to view your booking history</p>
          <button className="bg-purple-800 text-white px-8 py-3 rounded-xl hover:bg-purple-900 transition-colors font-semibold">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black text-purple-900">
            My Bookings
            <span className="text-2xl ml-4 text-black font-medium">({orders.length} entries)</span>
          </h1>
          <div className="flex items-center space-x-2 bg-black px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            <span className="text-white text-sm">{auth.user.username}</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8 flex justify-center">
              <div className="h-24 w-24 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Bookings Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">Your adventure starts here! Explore our collection and make your first booking.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map(order => (
              <div key={order.id} className="group bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-4 border-transparent hover:border-purple-50">
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
                  <div className="flex items-center justify-between bg-purple-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="font-semibold">{order.hours} hours</span>
                    </div>
                    <span className="text-2xl font-black text-purple-900">${order.total_price}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      order.status === 'approved' ? 'bg-green-100 text-green-800' :
                      order.status === 'declined' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600 p-4">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span className="text-sm">{new Date(order.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;