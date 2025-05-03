import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ is_authenticated: false, user: null });

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/me', { withCredentials: true });
      setAuth(res.data);
    } catch {
      setAuth({ is_authenticated: false, user: null });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
