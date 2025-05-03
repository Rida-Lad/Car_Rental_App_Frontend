import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const route = isSignup ? 'signup' : 'login';
    try {
      const res = await axios.post(`http://localhost:5000/api/${route}`, form, { withCredentials: true });
      setAuth(res.data);
      navigate('/');
    } catch (err) {
      alert(isSignup ? 'Signup failed' : 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:shadow-3xl">
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-purple-800 rounded-xl mb-4 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isSignup ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              )}
            </svg>
          </div>
          <h2 className="text-3xl font-black text-purple-900 mb-2">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignup ? 'Start your journey with us' : 'Sign in to continue'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 transition-all placeholder-transparent peer"
              placeholder=" "
              required
            />
            <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
              Username
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-6 py-4 text-lg border-0 ring-2 ring-gray-200 rounded-xl focus:ring-4 focus:ring-purple-800 transition-all placeholder-transparent peer"
              placeholder=" "
              required
            />
            <label className="absolute left-6 -top-3.5 bg-white px-2 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-purple-800 peer-focus:text-sm">
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-800 text-white py-4 px-6 rounded-xl hover:bg-purple-900 transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            {isSignup ? 'Get Started' : 'Sign In'}
            <span className="ml-2">→</span>
          </button>

          <p className="text-center text-gray-600">
            {isSignup ? 'Already a member?' : 'New to our platform?'}{' '}
            <button
              type="button"
              className="text-purple-800 font-semibold hover:text-purple-900 underline underline-offset-4"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Sign in instead' : 'Create account'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;