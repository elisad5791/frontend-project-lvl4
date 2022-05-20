import axios from 'axios';
import store from './store/store.js';
import { setAuthorized } from './slices/appSlice.js';
import routes from './routes.js';

const auth = {
  isAuthenticated: false,
  async login(userData) {
    const { data } = await axios.post(routes.loginPath(), userData);
    const authToken = { token: data.token };
    localStorage.setItem('userId', JSON.stringify(authToken));
    localStorage.setItem('username', userData.username);
    store.dispatch(setAuthorized(true));
  },
  logout() {
  },
  async signup(userData) {
    const { data } = await axios.post(routes.signupPath(), userData);
    const authToken = { token: data.token };
    localStorage.setItem('userId', JSON.stringify(authToken));
    localStorage.setItem('username', userData.username);
    store.dispatch(setAuthorized(true));
  },
};

export default auth;
