import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar } from 'react-bootstrap';
import routes from '../routes.js';
import authContext from '../contexts/authContext.jsx';

export default function AppNavbar() {
  const { t } = useTranslation();
  const auth = useContext(authContext);
  const userId = auth.getUserId();
  return (
    <Navbar bg="white" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to={routes.chatPagePath()} className="text-reset text-decoration-none">{t('chat')}</Link>
        </Navbar.Brand>
        {userId && <Link to={routes.logoutPath()} className="btn btn-primary">{t('auth.logout')}</Link>}
      </Container>
    </Navbar>
  );
}
