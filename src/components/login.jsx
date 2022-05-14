import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Form, Button, Card, Image, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setAuthorized } from '../slices/appSlice.js';
import routes from '../routes.js';
import imgLogin from '../../assets/chat.png';

const Login = () => {
  const { t } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    history.replace({ pathname: "/signup" });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        const authToken = { token: data.token };
        localStorage.setItem('userId', JSON.stringify(authToken));
        localStorage.setItem('username', values.username);
        setInvalid(false);
        dispatch(setAuthorized(true));
        history.replace({ pathname: "/" });
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          setInvalid(true);
        } else {
          toast(t('errors.network'), { type: 'error' });
        }
      }
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
                  name = "username"
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

              <Button variant="primary" type="submit">
                {t('auth.enter')}
              </Button>
              <ToastContainer />
            </Form>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-center">
        <Card.Link href="/signup" onClick={handleClick} className="text-decoration-none">{t('auth.registration')}</Card.Link>
      </Card.Footer>
    </Card>
  );
};

export default Login;
