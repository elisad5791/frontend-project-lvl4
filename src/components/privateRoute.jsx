import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from '../routes.js';

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  return (
    <Route
      render={() => (isAuthenticated
        ? (children)
        : <Redirect to={{ pathname: routes.loginPagePath() }} />)}
    />
  );
}

export default PrivateRoute;
