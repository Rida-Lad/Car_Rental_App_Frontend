import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCarForm from './AddCarForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCarForm />} />
      </Routes>
    </Router>
  );
}

export default App;
