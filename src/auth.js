import axios from 'axios';
import routes from './routes.js';
import store from './store/store.js';
import { setAuthenticated } from './slices/appSlice.js';

const auth = {
  async login(userData) {
    const { data } = await axios.post(routes.loginPath(), userData);
    const authToken = { token: data.token };
    localStorage.setItem('userId', JSON.stringify(authToken));
    localStorage.setItem('username', userData.username);
    store.dispatch(setAuthenticated(true));
  },
  async signup(userData) {
    const { data } = await axios.post(routes.signupPath(), userData);
    const authToken = { token: data.token };
    localStorage.setItem('userId', JSON.stringify(authToken));
    localStorage.setItem('username', userData.username);
    store.dispatch(setAuthenticated(true));
  },
  logout() {
    localStorage.clear();
    store.dispatch(setAuthenticated(false));
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
