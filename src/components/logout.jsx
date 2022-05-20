import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthorized } from '../slices/appSlice.js';
import routes from '../routes.js';

function Logout() {
  const dispatch = useDispatch();
  localStorage.clear();
  dispatch(setAuthorized(false));

  return (
    <Redirect to={{ pathname: routes.loginPagePath() }} />
  );
}

export default Logout;
