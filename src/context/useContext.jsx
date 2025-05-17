import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

// Create context with default values
export const UserContext = createContext({
  user: null,
  loading: true,
  updateUser: () => {},
  logout: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook for redirects

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      // Redirect to login if the token is missing
      navigate('/login');
      return;
    }

    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          setUser(null);
          // Redirect to login on unauthorized access
          navigate('/login');
        } else {
          console.error('API Error:', error.response.data);
        }
      } else {
        console.error('Network Error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (userData) => {
    // Ensure the profileImageUrl is absolute
    if (userData.profileImageUrl && !userData.profileImageUrl.startsWith('http')) {
      userData.profileImageUrl = `${process.env.VITE_API_URL || 'http://localhost:8000'}${userData.profileImageUrl}`;
    }
    setUser(userData);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    axiosInstance.defaults.headers.common['Authorization'] = '';
    setUser(null);
    // Redirect to login page on logout
    navigate('/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const contextValue = {
    user,
    loading,
    updateUser,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
