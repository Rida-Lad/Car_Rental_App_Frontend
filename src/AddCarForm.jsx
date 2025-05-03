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
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-purple-900 mb-2">Add New Vehicle</h2>
                    <p className="text-gray-600">Fill in the details to list a new car in the fleet</p>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Name Field */}
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 peer"
                                placeholder=" "
                            />
                            <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
                                Vehicle Name
                            </label>
                            {errors.name && <p className="text-red-500 text-sm mt-2">⚠️ {errors.name}</p>}
                        </div>

                        {/* Image Upload */}
                        <div className="relative">
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-purple-800 transition-colors">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <svg className="w-12 h-12 text-purple-800 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <p className="text-gray-600">
                                    {formData.image ? formData.image.name : 'Click to upload image'}
                                </p>
                                {errors.image && <p className="text-red-500 text-sm mt-2">⚠️ {errors.image}</p>}
                            </div>
                        </div>

                        {/* Pricing Section */}
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="new_price"
                                    value={formData.new_price}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 peer"
                                    placeholder=" "
                                />
                                <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
                                    Current Price
                                </label>
                                {errors.new_price && <p className="text-red-500 text-sm mt-2">⚠️ {errors.new_price}</p>}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="previous_price"
                                    value={formData.previous_price}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 peer"
                                    placeholder=" "
                                />
                                <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
                                    Original Price (optional)
                                </label>
                                {errors.previous_price && <p className="text-red-500 text-sm mt-2">⚠️ {errors.previous_price}</p>}
                            </div>
                        </div>

                        {/* Brand & Category */}
                        <div className="space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 peer"
                                    placeholder=" "
                                />
                                <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
                                    Manufacturer
                                </label>
                                {errors.brand && <p className="text-red-500 text-sm mt-2">⚠️ {errors.brand}</p>}
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 peer"
                                    placeholder=" "
                                />
                                <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
                                    Vehicle Class
                                </label>
                                {errors.category && <p className="text-red-500 text-sm mt-2">⚠️ {errors.category}</p>}
                            </div>
                        </div>

                        {/* Availability Toggle */}
                        <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="isavailable"
                                    checked={formData.isavailable}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"/>
                            </label>
                            <span className="text-lg font-semibold">
                                {formData.isavailable ? 'Available for Rent' : 'Marked as Unavailable'}
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-purple-800 text-white py-5 px-8 rounded-xl hover:bg-purple-900 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                    >
                        <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Add to Fleet
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCarForm;