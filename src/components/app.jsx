import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import SpecialRoute from './specialRoute.jsx';
import Login from './login.jsx';
import Logout from './logout.jsx';
import Signup from './signup.jsx';
import Chat from './chat.jsx';
import img404 from '../../assets/eyes.png';

export default function App() {
  const { t } = useTranslation();
  const isAuthorized = useSelector((state) => state.app.isAuthorized);
  return (
    <Router>
      <Navbar bg="white" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand>
            <Link to="/" className='text-reset text-decoration-none'>{t('chat')}</Link>
          </Navbar.Brand>
          {isAuthorized && <Link to="/logout" className="btn btn-primary">{t('auth.logout')}</Link>}
        </Container>
      </Navbar>  

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <SpecialRoute exact path="/">
          <Chat />
        </SpecialRoute>
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
