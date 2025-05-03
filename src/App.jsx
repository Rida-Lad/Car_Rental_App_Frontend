import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCarForm from './AddCarForm';
import CarsList from './CarsList';
import ProtectedRoute from './Protected';
import Login from './Login';
import MyOrders from './Myorders';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCarForm />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
