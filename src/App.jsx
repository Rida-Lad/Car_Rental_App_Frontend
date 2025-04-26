import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCar from './pages/AddCar';
import CarsList from './pages/CarsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CarsList />} />
        <Route path="/admin/addcar" element={<AddCar />} />
      </Routes>
    </Router>
  );
}
export default App;