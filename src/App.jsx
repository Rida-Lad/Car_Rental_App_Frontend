import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCarForm from './AddCarForm';
import CarsList from './CarsList';
import Login from './Login';
import MyOrders from './Myorders';
import Orders from './Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCarForm />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
