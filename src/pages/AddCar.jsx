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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Price per Day:</label>
                <input
                    type="number"
                    name="price_per_day"
                    value={formData.price_per_day}
                    onChange={handleChange}
                    step="0.01"
                    required
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Category:</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Category</option>
                    <option value="economy">Economy</option>
                    <option value="luxury">Luxury</option>
                    <option value="suv">SUV</option>
                    <option value="van">Van</option>
                </select>
            </div>
            
            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Availability:</label>
                <select
                    name="is_available"
                    value={formData.is_available}
                    onChange={handleChange}
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                </select>
            </div>
            
            <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-medium">Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <button 
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
                Add Car
            </button>
        </form>
    </div>
);
};

export default AddCar;