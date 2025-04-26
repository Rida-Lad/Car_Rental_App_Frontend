import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminAddCar() {
  const [formData, setFormData] = useState({
    model: '',
    description: '',
    price_per_day: '',
    image_url: ''
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/addcar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(formData)
    });
    
    if(res.ok) navigate('/admin/setavailable');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Car</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Model"
          className="w-full p-2 border rounded"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price per day"
          className="w-full p-2 border rounded"
          value={formData.price_per_day}
          onChange={(e) => setFormData({ ...formData, price_per_day: e.target.value })}
        />
        <input
          type="url"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}