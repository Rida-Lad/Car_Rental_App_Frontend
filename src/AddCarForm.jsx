import React, { useState } from 'react';
import axios from 'axios';

const AddCarForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
        isavailable: true,
        previous_price: '',
        new_price: '',
        brand: '',
        category: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = 'Name is required';
        if (!formData.image) errs.image = 'Image is required';
        if (!formData.new_price || isNaN(formData.new_price)) errs.new_price = 'Valid new price is required';
        if (formData.previous_price && isNaN(formData.previous_price)) errs.previous_price = 'Previous price must be a number';
        if (!formData.brand.trim()) errs.brand = 'Brand is required';
        if (!formData.category.trim()) errs.category = 'Category is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = e => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validate()) return;

        const data = new FormData();
        data.append('name', formData.name);
        data.append('image', formData.image);
        data.append('isavailable', formData.isavailable);
        data.append('previous_price', formData.previous_price);
        data.append('new_price', formData.new_price);
        data.append('brand', formData.brand);
        data.append('category', formData.category);

        try {
            await axios.post('http://localhost:5000/api/cars', data);
            alert('Car added successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to add car');
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 border rounded shadow">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <input type="text" name="name" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image:</label>
                <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Available:</label>
                <input type="checkbox" name="isavailable" checked={formData.isavailable} onChange={handleChange} className="mt-1" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Previous Price:</label>
                <input type="text" name="previous_price" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.previous_price && <p className="text-red-500 text-sm mt-1">{errors.previous_price}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">New Price:</label>
                <input type="text" name="new_price" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.new_price && <p className="text-red-500 text-sm mt-1">{errors.new_price}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Brand:</label>
                <input type="text" name="brand" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Category:</label>
                <input type="text" name="category" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add Car</button>
        </form>
    );
};

export default AddCarForm;
