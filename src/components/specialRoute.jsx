import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const SpecialRoute = ({ children, ...rest }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return (
    <Route {...rest} render={() => userId ? (children) : <Redirect to={{pathname: "/login"}} />} />
  );
};

export default SpecialRoute;