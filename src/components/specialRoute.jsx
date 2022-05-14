import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function SpecialRoute({ children }) {
  const userId = JSON.parse(localStorage.getItem('userId'));
  return (
    <Route render={() => (userId ? (children) : <Redirect to={{ pathname: '/login' }} />)} />
  );
}

export default SpecialRoute;
