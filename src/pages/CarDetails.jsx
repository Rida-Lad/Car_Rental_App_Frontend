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
    <div className="car-details">
      <img src={`http://localhost:5000/${car.image}`} alt={car.name} />
      <h1>{car.name}</h1>
      <p>{car.description}</p>
      <div className="price-section">
        <p>Price per day: ${car.price_per_day}</p>
        <div>
          <label>Rental Days:</label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(Math.max(1, e.target.value))}
          />
        </div>
        <p>Total Price: ${(days * car.price_per_day).toFixed(2)}</p>
        <button onClick={handleOrder}>Book Now</button>
      </div>
    </div>
  );
};

export default CarDetails;