import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import routes from '../routes.js';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  return (
    <Route
      render={() => (isAuthenticated ? (children) : <Redirect to={{ pathname: routes.loginPagePath() }} />)}
    />
  );
}

export default PrivateRoute;
