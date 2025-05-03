import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCarForm from './AddCarForm';
import CarsList from './CarsList';
import ProtectedRoute from './Protected';
import Login from './Login';
import MyOrders from './Myorders';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './AdminLogin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><AddCarForm /></ProtectedRoute>} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
