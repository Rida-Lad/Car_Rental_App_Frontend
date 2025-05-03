import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [renting, setRenting] = useState(null);
  const [hours, setHours] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { auth } = useAuth();

  // Extract unique categories
  const categories = [...new Set(cars.map(car => car.category))];

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars').then(res => {
      setCars(res.data);
      setFilteredCars(res.data);
    });
  }, []);

  useEffect(() => {
    filterCars();
  }, [searchQuery, selectedCategory]);

  const filterCars = () => {
    let filtered = cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    setFilteredCars(filtered);
  };

  const handleRentClick = (carId) => {
    if (!auth?.is_authenticated) {
      window.location.href = '/login';
    } else {
      setRenting(carId);
    }
  };

  const handleSubmitOrder = async (car) => {
    const total = car.new_price * hours;
    try {
      await axios.post('http://localhost:5000/orders', {
        car_id: car.id,
        user_id: auth.user.id,
        hours,
        total_price: total,
      });
      alert('Order placed!');
      setRenting(null);
      setHours(1);
    } catch (err) {
      alert('Failed to place order');
    }
  };

  const calculateDiscount = (previous, current) => {
    return Math.round(((previous - current) / previous) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-purple-900 mb-12 text-center">
          Premium Fleet Selection
          <span className="text-2xl block mt-2 text-gray-600 font-medium">Choose Your Dream Ride</span>
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 transition-all"
            />
          </div>
          
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-8 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <svg className="w-6 h-6 absolute right-6 top-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="mb-8 flex justify-center">
                <div className="h-24 w-24 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Matching Vehicles Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">Try adjusting your search terms or category filters</p>
            </div>
          ) : (
            filteredCars.map(car => (
              <div key={car.id} className="group bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-purple-50 relative">
                {car.previous_price && (
                  <div className="absolute top-4 right-4 bg-purple-800 text-white px-4 py-2 rounded-full text-sm font-bold z-10">
                    {calculateDiscount(car.previous_price, car.new_price)}% OFF
                  </div>
                )}

                <div className="relative overflow-hidden rounded-2xl mb-6 h-60">
                  <img 
                    src={`http://localhost:5000${car.image_url}`} 
                    alt={car.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                    <h2 className="text-2xl font-bold text-white">{car.name}</h2>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
                    <svg className="w-5 h-5 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                    <span className="text-sm font-semibold text-purple-800">{car.brand}</span>
                  </div>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{car.category}</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-end justify-between">
                    <div className="space-y-1">
                      {car.previous_price && (
                        <p className="text-gray-400 line-through text-lg">${car.previous_price}</p>
                      )}
                      <p className="text-3xl font-black text-purple-900">
                        ${car.new_price}
                        <span className="text-sm text-gray-500 ml-1">/hour</span>
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                      Best Deal
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <svg className={`w-6 h-6 ${car.isavailable ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {car.isavailable ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      )}
                    </svg>
                    <span className={`font-semibold ${car.isavailable ? 'text-green-700' : 'text-red-700'}`}>
                      {car.isavailable ? 'Available Now' : 'Booked Out'}
                    </span>
                  </div>
                </div>

                {car.isavailable ? (
                  renting === car.id ? (
                    <div className="space-y-4 animate-fade-in">
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full px-6 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-800 focus:ring-0 text-lg font-semibold"
                          placeholder=" "
                        />
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl">
                        <p className="text-center text-lg font-bold">
                          Total: <span className="text-purple-900">${car.new_price * hours}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleSubmitOrder(car)}
                        className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors font-bold text-lg shadow-md hover:shadow-lg"
                      >
                        Confirm Booking
                        <span className="ml-2">→</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRentClick(car.id)}
                      className="w-full bg-purple-800 text-white py-4 rounded-xl hover:bg-purple-900 transition-colors font-bold text-lg shadow-md hover:shadow-lg"
                    >
                      Instant Reservation
                    </button>
                  )
                ) : (
                  <div className="text-center py-4 bg-red-50 rounded-xl">
                    <p className="text-red-700 font-semibold">Available Soon</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CarList;