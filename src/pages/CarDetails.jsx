import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(response.data);
        setLoading(false);
      } catch (err) {
        setError('Car not found');
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth', { state: { from: `/cardetails/${id}` } });
        return;
      }

      const totalPrice = days * car.price_per_day;
      await axios.post('http://localhost:5000/api/orders', 
        { car_id: id, days, total_price: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order created successfully!');
    } catch (error) {
      console.error(error);
      alert('Order failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <img 
            src={`http://localhost:5000/${car.image}`} 
            alt={car.name} 
            className="w-full h-64 object-contain rounded-lg mb-6" // Changed height and object-fit
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{car.name}</h1>
        <p className="text-gray-600 mb-6">{car.description}</p>
        <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-xl font-semibold text-gray-800 mb-4">
                Price per day: ${car.price_per_day}
            </p>
            <div className="flex items-center gap-4 mb-4">
                <label className="text-gray-700">Rental Days:</label>
                <input
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(Math.max(1, e.target.value))}
                    className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <p className="text-xl font-semibold text-gray-800 mb-6">
                Total Price: ${(days * car.price_per_day).toFixed(2)}
            </p>
            <button 
                onClick={handleOrder}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
                Book Now
            </button>
        </div>
    </div>
);
};

export default CarDetails;