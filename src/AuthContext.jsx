import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        setAuthState({
          isAuthenticated: true,
          user: parsedAuth.user,
          isLoading: false
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (userData) => {
    const authData = {
      isAuthenticated: true,
      user: userData
    };
    localStorage.setItem('auth', JSON.stringify(authData));
    setAuthState({
      isAuthenticated: true,
      user: userData,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}