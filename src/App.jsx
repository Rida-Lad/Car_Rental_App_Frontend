import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Auth from './pages/Auth';
import MyOrders from './pages/MyOrders';
import AdminAddCar from './pages/AdminAddCar';
import AdminSetAvailable from './pages/AdminSetAvailable';
import AdminOrders from './pages/AdminOrders';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/car/:id" element={<CarDetails />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin/addcar" element={<AdminAddCar />} />
            <Route path="/admin/setavailable" element={<AdminSetAvailable />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}