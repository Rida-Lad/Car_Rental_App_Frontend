import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

const carData = {
  1: { make: 'Toyota', model: 'Camry', year: 2022, price: '$25,000' },
  2: { make: 'Honda', model: 'Accord', year: 2021, price: '$27,000' },
  3: { make: 'Ford', model: 'Mustang', year: 2023, price: '$35,000' },
};

function CarDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const car = carData[id];

  if (!car) {
    return <div className="error">Car not found</div>;
  }

  return (
    <div className="car-details">
      <h1>{car.make} {car.model}</h1>
      <div className="car-specs">
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> {car.price}</p>
      </div>
      {isAuthenticated && user && (
        <div className="user-greeting">
          <p>Welcome back, <strong>{user.username}</strong>!</p>
        </div>
      )}
    </div>
  );
}

export default CarDetails;