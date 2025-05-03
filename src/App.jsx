import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCarForm from './AddCarForm';
import CarsList from './CarsList';
import ProtectedRoute from './Protected';
import Login from './Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><AddCarForm /></ProtectedRoute>} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
