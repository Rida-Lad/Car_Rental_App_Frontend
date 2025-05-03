import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateCars = () => {
  const [accessCode, setAccessCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [cars, setCars] = useState([]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/admin/verify', { access_code: accessCode });
      if (res.data.is_admin) {
        setVerified(true);
        fetchCars();
      } else {
        alert('Invalid access code');
      }
    } catch {
      alert('Error verifying access code');
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/cars');
      setCars(res.data);
    } catch {
      alert('Failed to fetch cars');
    }
  };

  const updateAvailability = async (id, newStatus) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/cars/${id}/availability`, { isavailable: newStatus });
      setCars(prev =>
        prev.map(car => car.id === id ? { ...car, isavailable: newStatus } : car)
      );
    } catch {
      alert('Failed to update availability');
    }
  };

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-3xl">
          <div className="flex flex-col items-center mb-8">
            <div className="h-16 w-16 bg-purple-800 rounded-xl mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-black text-purple-900 mb-2">Admin Portal</h2>
            <p className="text-gray-600">Enter security code to continue</p>
          </div>
          <form onSubmit={handleVerify} className="space-y-6">
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
              Verify Identity
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
            Fleet Management
            <span className="text-2xl ml-4 text-black font-medium">({cars.length} vehicles)</span>
          </h1>
          <div className="flex items-center space-x-2 bg-purple-800 px-4 py-2 rounded-full">
            <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Admin Session Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <div key={car.id} className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-purple-50">
              <div className="relative overflow-hidden rounded-2xl mb-6 h-60">
                <img 
                  src={`http://localhost:5000${car.image_url}`} 
                  alt={car.name} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                  <h3 className="text-2xl font-bold text-white">{car.name}</h3>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
                    <svg className="w-5 h-5 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                    <span className="text-sm font-semibold text-purple-800">{car.brand}</span>
                  </div>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{car.category}</span>
                </div>

                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                  <span className="text-gray-600">Current Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    car.isavailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {car.isavailable ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => updateAvailability(car.id, !car.isavailable)}
                className={`w-full py-4 px-6 rounded-xl transition-all font-bold text-lg shadow-md hover:shadow-lg ${
                  car.isavailable 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-purple-800 hover:bg-purple-900 text-white'
                }`}
              >
                {car.isavailable ? (
                  <>
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Mark Unavailable
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Activate Vehicle
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateCars;