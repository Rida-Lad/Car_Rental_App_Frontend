import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" />;
  if (adminOnly && user.role !== 1) return <Navigate to="/" />;
  
  return <Outlet />;
};

export default ProtectedRoute;