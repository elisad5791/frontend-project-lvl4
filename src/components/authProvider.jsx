import React from 'react';
import authContext from '../contexts/authContext.jsx';
import useProvideAuth from '../hooks/useProvideAuth.jsx';

export default function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
