import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../routes.js';
import authContext from '../contexts/authContext.jsx';

function Logout() {
  const auth = useContext(authContext);
  auth.logout();

  return (
    <Redirect to={{ pathname: routes.loginPagePath() }} />
  );
}

export default Logout;
