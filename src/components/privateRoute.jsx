import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import routes from '../routes.js';
import authContext from '../contexts/authContext.jsx';

function PrivateRoute({ children }) {
  const auth = useContext(authContext);
  const userId = auth.getUserId();
  return (
    <Route
      render={() => (userId ? (children) : <Redirect to={{ pathname: routes.loginPagePath() }} />)}
    />
  );
}

export default PrivateRoute;
