import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/useContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // or spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRole = user.role === 'member' ? 'user' : user.role;

  if (!allowedRoles.includes(normalizedRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
