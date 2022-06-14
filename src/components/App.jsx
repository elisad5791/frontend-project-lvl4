import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import LoginPage from './LoginPage.jsx';
import LogoutPage from './LogoutPage.jsx';
import SignupPage from './SignupPage.jsx';
import ChatPage from './ChatPage.jsx';
import AppNavbar from './AppNavbar.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import routes from '../routes.js';

export default function App() {
  return (
    <Router>
      <AppNavbar />

      <Switch>
        <Route path={routes.loginPagePath()}>
          <LoginPage />
        </Route>
        <Route path={routes.logoutPath()}>
          <LogoutPage />
        </Route>
        <Route path={routes.signupPagePath()}>
          <SignupPage />
        </Route>
        <PrivateRoute exact path={routes.chatPagePath()}>
          <ChatPage />
        </PrivateRoute>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}
