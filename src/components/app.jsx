import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './privateRoute.jsx';
import LoginPage from './loginPage.jsx';
import LogoutPage from './logoutPage.jsx';
import SignupPage from './signupPage.jsx';
import ChatPage from './chatPage.jsx';
import AppNavbar from './appNavbar.jsx';
import NotFoundPage from './notFoundPage.jsx';
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
