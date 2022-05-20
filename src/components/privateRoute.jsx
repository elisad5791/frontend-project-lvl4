import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import routes from '../routes.js';

function PrivateRoute({ children }) {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return (
    <Route
      render={() => (userId ? (children) : <Redirect to={{ pathname: routes.loginPagePath() }} />)}
    />
  );
}

export default PrivateRoute;
