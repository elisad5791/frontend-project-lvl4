import axios from 'axios';
import routes from './routes.js';

const auth = {
  async login(userData) {
    const { data } = await axios.post(routes.loginPath(), userData);
    const authToken = { token: data.token };
    localStorage.setItem('userId', JSON.stringify(authToken));
    localStorage.setItem('username', userData.username);
  },
  async signup(userData) {
    const { data } = await axios.post(routes.signupPath(), userData);
    const authToken = { token: data.token };
    localStorage.setItem('userId', JSON.stringify(authToken));
    localStorage.setItem('username', userData.username);
  },
  logout() {
    localStorage.clear();
  },
  getToken() {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return userId.token;
  },
  getUserId() {
    const userId = JSON.parse(localStorage.getItem('userId'));
    return userId;
  },
  getUsername() {
    const username = localStorage.getItem('username');
    return username;
  },
};

export default auth;
