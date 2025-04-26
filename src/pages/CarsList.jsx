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
    <div className="car-listing">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="economy">Economy</option>
          <option value="luxury">Luxury</option>
          <option value="suv">SUV</option>
          <option value="van">Van</option>
        </select>
      </div>

      <div className="car-grid">
        {filteredCars.length === 0 ? (
          <div className="no-results">No cars found matching your criteria</div>
        ) : (
          filteredCars.map(car => (
            <div key={car.id} className="car-card">
              <img 
                src={`http://localhost:5000/${car.image}`} 
                alt={car.name} 
                className="car-image"
              />
              <div className="car-details">
                <h3>{car.name}</h3>
                <p>${car.price_per_day}/day</p>
                <span className="category-tag">{car.category}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CarsList;