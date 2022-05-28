import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './privateRoute.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';
import Signup from './signup.jsx';
import Chat from './chat.jsx';
import AppNavbar from './appNavbar.jsx';
import NotFoundPage from './notFoundPage.jsx';
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
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
}
