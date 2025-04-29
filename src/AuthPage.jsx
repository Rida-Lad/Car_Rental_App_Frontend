import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Store the complete user data
      login({
        username: formData.username,
        token: data.token,
        isAdmin: data.isAdmin || false
      });

      // Redirect to home page
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error('Auth error:', err);
    }
  };

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
            <div className="mb-4">
                <label 
                    htmlFor="username" 
                    className="block text-gray-700 font-medium mb-2"
                >
                    Username:
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            <div className="mb-4">
                <label 
                    htmlFor="password" 
                    className="block text-gray-700 font-medium mb-2"
                >
                    Password:
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </button>
        </form>
        <button 
            type="button" 
            className="mt-4 text-blue-500 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
        >
            {isLogin ? 'Need to create an account?' : 'Already have an account?'}
        </button>
    </div>
);
}

export default AuthPage;