import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_per_day: '',
    is_available: true,
    category: '',
    image: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price_per_day', formData.price_per_day);
    data.append('is_available', formData.is_available);
    data.append('category', formData.category);
    data.append('image', formData.image);

    try {
      await axios.post('http://localhost:5000/api/cars', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Car added successfully!');
      // Reset form
      setFormData({
        name: '',
        description: '',
        price_per_day: '',
        is_available: true,
        category: '',
        image: null
      });
    } catch (error) {
      console.error(error);
      alert('Error adding car');
    }
  };

  return (
    <div className="add-car-form">
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Price per Day:</label>
          <input
            type="number"
            name="price_per_day"
            value={formData.price_per_day}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="economy">Economy</option>
            <option value="luxury">Luxury</option>
            <option value="suv">SUV</option>
            <option value="van">Van</option>
          </select>
        </div>
        
        <div>
          <label>Availability:</label>
          <select
            name="is_available"
            value={formData.is_available}
            onChange={handleChange}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;