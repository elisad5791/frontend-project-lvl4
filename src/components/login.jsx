import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, t('errors.max20'))
        .required(t('errors.required')),
      password: Yup.string()
        .min(5, t('errors.min5'))
        .max(20, t('errors.max20'))
        .required(t('errors.required')),
    }),
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
          toast(t('errors.network'));
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
                <Form.Label>{t('auth.username')}</Form.Label>
                <Form.Control
                  name = "username"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <Form.Text className="text-danger">
                    {formik.errors.username}
                  </Form.Text>
                ) : null}
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
                {formik.touched.password && formik.errors.password ? (
                  <Form.Text className="text-danger">
                    {formik.errors.password}
                  </Form.Text>
                ) : null}
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
        <Button variant="outline-primary" size="sm" href="/signup">{t('auth.registration')}</Button>
      </Card.Footer>
    </Card>
  );
};

export default Login;
