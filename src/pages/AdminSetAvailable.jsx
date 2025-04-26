import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminSetAvailable() {
  const [cars, setCars] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch('http://localhost:5000/api/admin/cars', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await res.json();
      setCars(data);
    };
    fetchCars();
  }, [user]);

  const toggleAvailability = async (carId) => {
    await fetch(`http://localhost:5000/api/admin/cars/${carId}/availability`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    setCars(cars.map(car => 
      car.id === carId ? { ...car, available: !car.available } : car
    ));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Car Availability</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car.id} className="border p-4 rounded">
            <img src={car.image_url} alt={car.model} className="h-48 w-full object-cover mb-2" />
            <h3 className="text-xl font-bold">{car.model}</h3>
            <div className="flex items-center justify-between mt-2">
              <span>Available: {car.available ? 'Yes' : 'No'}</span>
              <button
                onClick={() => toggleAvailability(car.id)}
                className={`p-2 rounded ${car.available ? 'bg-red-500' : 'bg-green-500'} text-white`}
              >
                {car.available ? 'Make Unavailable' : 'Make Available'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}