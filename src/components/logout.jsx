import React from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

function Logout() {
  const auth = useAuth();
  auth.logout();

  return (
    <Redirect to={{ pathname: routes.loginPagePath() }} />
  );
}

export default Logout;
