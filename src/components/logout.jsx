import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
  localStorage.clear();
  return (
    <Redirect to={{pathname: "/login"}} />
  );
};

export default Logout;
