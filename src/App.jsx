import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddCar from './pages/AddCar';
import CarsList from './pages/CarsList';
import CarDetails from './pages/CarDetails';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarsList />} />
        <Route path="/cardetails/:id" element={
          <ProtectedRoute>
            <CarDetails />
          </ProtectedRoute>
        } />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/addcar" element={<AddCar />} />
      </Routes>
    </Router>
  );
}

export default App;