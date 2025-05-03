import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCarForm from './AddCarForm';
import CarsList from './CarsList';
import Login from './Login';
import MyOrders from './Myorders';
import Orders from './Orders';
import UpdateCars from './UpdateCars';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addcar" element={<AddCarForm />} />
        <Route path="/" element={<CarsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/updatecars" element={<UpdateCars />} />
      </Routes>
    </Router>
  );
}

export default App;
