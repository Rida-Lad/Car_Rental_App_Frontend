import React from 'react';
import { Link } from 'react-router-dom';

const cars = [
  { id: 1, make: 'Toyota', model: 'Camry' },
  { id: 2, make: 'Honda', model: 'Accord' },
  { id: 3, make: 'Ford', model: 'Mustang' },
];

function HomePage() {
return (
    <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Car Marketplace</h1>
        <p className="text-lg mb-6">Browse our selection of cars below:</p>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map(car => (
                <div key={car.id} className="p-4 border rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{car.make} {car.model}</h3>
                    <Link 
                        to={`/cardetails/${car.id}`} 
                        className="text-blue-500 hover:underline"
                    >
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    </div>
);
}

export default HomePage;