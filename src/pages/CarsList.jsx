import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cars');
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div className="error">{error}</div>;

return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
            <input
                type="text"
                placeholder="Search by car name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full md:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="All">All Categories</option>
                <option value="economy">Economy</option>
                <option value="luxury">Luxury</option>
                <option value="suv">SUV</option>
                <option value="van">Van</option>
            </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.length === 0 ? (
                <div className="col-span-full text-center text-gray-500 py-8">
                    No cars found matching your criteria
                </div>
            ) : (
                filteredCars.map(car => (
                    <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <img 
                            src={`http://localhost:5000/${car.image}`} 
                            alt={car.name} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{car.name}</h3>
                            <p className="text-lg text-blue-600 font-bold mt-2">${car.price_per_day}/day</p>
                            <span className="inline-block px-3 py-1 mt-2 text-sm font-semibold text-white bg-blue-500 rounded-full">
                                {car.category}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
);
};

export default CarsList;