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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">{isSignup ? 'Sign Up' : 'Login'}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-2">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>

        <p className="text-sm text-center">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Login here' : 'Sign up here'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
