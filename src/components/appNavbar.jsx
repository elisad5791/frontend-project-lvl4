import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import routes from '../routes.js';

export default function AppNavbar() {
  const { t } = useTranslation();
  const isAuthorized = useSelector((state) => state.app.isAuthorized);
  return (
    <Navbar bg="white" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to={routes.chatPagePath()} className="text-reset text-decoration-none">{t('chat')}</Link>
        </Navbar.Brand>
        {isAuthorized && <Link to={routes.logoutPath()} className="btn btn-primary">{t('auth.logout')}</Link>}
      </Container>
    </Navbar>
  );
}
