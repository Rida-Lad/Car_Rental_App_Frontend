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
        return <div className="text-center text-red-500 font-bold mt-10">Car not found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{car.make} {car.model}</h1>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Year:</span> {car.year}</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Price:</span> {car.price}</p>
            {user && <p className="text-blue-600 font-medium">Welcome, {user.username} !</p>}
        </div>
    );
}

export default CarDetails;