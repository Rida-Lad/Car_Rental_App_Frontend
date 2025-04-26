import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch('http://localhost:5000/api/cars');
      const data = await res.json();
      setCars(data);
    };
    fetchCars();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cars.map(car => (
        <div key={car.id} className="border p-4 rounded">
          <img src={car.image_url} alt={car.model} className="h-48 w-full object-cover" />
          <h3 className="text-xl font-bold mt-2">{car.model}</h3>
          <p>${car.price_per_day}/day</p>
          <Link to={`/car/${car.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}