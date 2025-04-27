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
  const { user } = useAuth();
  const car = carData[id];

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div>
      <h1>{car.make} {car.model}</h1>
      <p>Year: {car.year}</p>
      <p>Price: {car.price}</p>
      {user && <p>Welcome, {user.username}!</p>}
    </div>
  );
}

export default CarDetails;