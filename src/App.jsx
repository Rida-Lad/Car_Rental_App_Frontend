import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCarForm from './AddCarForm';
import CarsList from './CarsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCarForm />} />
        <Route path="/cars" element={<CarsList />} />
      </Routes>
    </Router>
  );
}

export default App;
