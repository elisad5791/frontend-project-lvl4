import { useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';

export default () => {
  const [username, setUsername] = useState(localStorage.getItem('username') ?? null);

  const sign = async (route, userData) => {
    const { data } = await axios.post(route, userData);
    const authToken = { token: data.token };
    localStorage.setItem('userId', JSON.stringify(authToken));
    localStorage.setItem('username', userData.username);
    setUsername(userData.username);
  };

  const login = async (userData) => {
    await sign(routes.loginPath(), userData);
  };

  const signup = async (userData) => {
    await sign(routes.signupPath(), userData);
  };

  const logout = () => {
    localStorage.clear();
    setUsername(null);
  };

  const getToken = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return userId.token;
  };

  const getUserId = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return userId;
  };

  return {
    username,
    login,
    signup,
    logout,
    getToken,
    getUserId,
  };
};
