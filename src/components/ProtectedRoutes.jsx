import { Navigate, Outlet } from 'react-router-dom';

const tokenValue = localStorage.getItem('token');

const ProtectedRoutes = () => {
  if (tokenValue) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
