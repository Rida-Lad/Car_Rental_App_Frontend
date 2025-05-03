// CarList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [renting, setRenting] = useState(null);
  const [hours, setHours] = useState(1);
  const { auth } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars').then(res => {
      setCars(res.data);
    });
  }, []);

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {cars.map(car => (
        <div key={car.id} className="bg-white p-4 rounded shadow">
          <img src={`http://localhost:5000${car.image_url}`} alt={car.name} className="h-40 w-full object-cover mb-2" />
          <h2 className="text-lg font-bold">{car.name}</h2>
          <p className="text-gray-500 line-through">${car.previous_price}</p>
          <p className="text-green-600 font-semibold">${car.new_price}</p>
          <p className="text-sm text-gray-700">Brand: {car.brand} | Category: {car.category}</p>

          {renting === car.id ? (
            <div className="mt-2">
              <input
                type="number"
                min="1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full border p-1 rounded mb-2"
              />
              <p>Total: <strong>${car.new_price * hours}</strong></p>
              <button
                onClick={() => handleSubmitOrder(car)}
                className="mt-1 bg-blue-600 text-white p-1 px-3 rounded hover:bg-blue-700"
              >
                Confirm Order
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleRentClick(car.id)}
              className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Rent Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CarList;
