// src/components/ProtectedRoute.js
import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        token ? <Component {...props} /> : <Navigate to="/volunteer/login" />
      }
    />
  );
};

export default ProtectedRoute;