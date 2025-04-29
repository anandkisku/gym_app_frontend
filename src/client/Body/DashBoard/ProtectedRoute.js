import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8000/check-auth", {
          withCredentials: true
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [isAuthenticated, setIsAuthenticated, navigate]);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute; 