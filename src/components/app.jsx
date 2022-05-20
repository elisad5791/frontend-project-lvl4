import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import PrivateRoute from './privateRoute.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';
import Signup from './signup.jsx';
import Chat from './chat.jsx';
import AppNavbar from './appNavbar.jsx';
import img404 from '../../assets/eyes.png';
import routes from '../routes.js';

export default function App() {
  return (
    <Router>
      <AppNavbar />

      <Switch>
        <Route path={routes.loginPagePath()}>
          <Login />
        </Route>
        <Route path={routes.logoutPath()}>
          <Logout />
        </Route>
        <Route path={routes.signupPagePath()}>
          <Signup />
        </Route>
        <PrivateRoute exact path={routes.chatPagePath()}>
          <Chat />
        </PrivateRoute>
        <Route path="*">
          <Empty />
        </Route>
      </Switch>
    </Router>
  );
}

function Empty() {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <h2>404</h2>
      <p>{t('errors.pageNotFound')}</p>
      <Image src={img404} />
    </div>
  );
}
