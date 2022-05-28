import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

function PrivateRoute({ children }) {
  const auth = useAuth();
  const userId = auth.getUserId();
  return (
    <Route
      render={() => (userId
        ? (children)
        : <Redirect to={{ pathname: routes.loginPagePath() }} />)}
    />
  );
}

export default PrivateRoute;
