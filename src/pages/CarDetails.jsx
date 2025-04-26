import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [days, setDays] = useState(1);

  useEffect(() => {
    if(!user) navigate('/auth');
    
    const fetchCar = async () => {
      const res = await fetch(`http://localhost:5000/api/cars/${id}`);
      const data = await res.json();
      setCar(data);
    };
    fetchCar();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify({
        car_id: id,
        start_date: startDate,
        end_date: endDate
      })
    });

    if(res.ok) navigate('/myorders');
  };

  if(!car) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src={car.image_url} alt={car.model} className="w-full h-96 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{car.model}</h1>
      <p className="mt-2 text-gray-600">{car.description}</p>
      <p className="mt-2 text-xl">${car.price_per_day}/day</p>

      <form onSubmit={handleSubmit} className="mt-8 border p-4 rounded">
        <div className="mb-4">
          <label className="block mb-2">Rental Days</label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}