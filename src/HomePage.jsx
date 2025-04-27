import React from 'react';
import { Link } from 'react-router-dom';

const cars = [
  { id: 1, make: 'Toyota', model: 'Camry' },
  { id: 2, make: 'Honda', model: 'Accord' },
  { id: 3, make: 'Ford', model: 'Mustang' },
];

function HomePage() {
  return (
    <div>
      <h1>Welcome to Car Marketplace</h1>
      <p>Browse our selection of cars below:</p>
      
      <div className="car-list">
        {cars.map(car => (
          <div key={car.id} className="car-item">
            <h3>{car.make} {car.model}</h3>
            <Link to={`/cardetails/${car.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;