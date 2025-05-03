import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.is_authenticated) return <Navigate to="/login" />;
  return children;
};
export default ProtectedRoute;