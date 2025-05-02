// CarsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarsList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars')
      .then(res => setCars(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Cars</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {cars.map(car => (
          <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300">
            <img
              src={`http://localhost:5000${car.image_url}`}
              alt={car.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{car.name}</h2>
              <p className="text-sm text-gray-600">{car.brand} - {car.category}</p>
              <div className="mt-2">
                {car.previous_price && (
                  <span className="line-through text-red-500 mr-2">
                    ${parseFloat(car.previous_price).toFixed(2)}
                  </span>
                )}
                <span className="text-green-600 font-bold">
                  ${parseFloat(car.new_price).toFixed(2)}
                </span>
              </div>
              <p className={`mt-2 text-sm ${car.isavailable ? 'text-green-600' : 'text-red-500'}`}>
                {car.isavailable ? 'Available' : 'Not Available'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsList;
