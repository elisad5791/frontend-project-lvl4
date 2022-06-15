import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import {
  Form, Button, Card, Image, Row, Col,
} from 'react-bootstrap';
import imgLogin from '../../assets/chat.png';
import imgSpinner from '../../assets/spinner.gif';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

function LoginPage() {
  const { t } = useTranslation();
  const auth = useAuth();
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();
  const [processing, setProcessing] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    history.replace({ pathname: routes.signupPagePath() });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setProcessing(true);
      try {
        await auth.login(values);
        setInvalid(false);
        history.replace({ pathname: routes.chatPagePath() });
      } catch (e) {
        if (e.response.status === 401) {
          auth.logout();
          setInvalid(true);
        } else {
          toast(t('errors.network'), { type: 'error' });
        }
      }
      setProcessing(false);
    },
  });
  return (
    <Card style={{ width: '40rem' }} className="position-absolute top-50 start-50 translate-middle">
      <Card.Header as="h2">{t('auth.enter')}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Image src={imgLogin} />
          </Col>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>{t('auth.nik')}</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>{t('auth.password')}</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </Form.Group>

              {invalid && <div className="text-danger mb-3">{t('errors.auth')}</div>}

              <Button variant="primary" type="submit" disabled={processing}>
                {processing ? <Image src={imgSpinner} width={16} height={16} /> : t('auth.enter')}
              </Button>
              <ToastContainer />
            </Form>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-center">
        <Card.Link href={routes.signupPagePath()} onClick={handleClick} className="text-decoration-none">{t('auth.registration')}</Card.Link>
      </Card.Footer>
    </Card>
  );
}

export default LoginPage;
