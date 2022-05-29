import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, Button, Card, Image, Row, Col,
} from 'react-bootstrap';
import { setRequestState } from '../slices/index.js';
import imgSignup from '../../assets/auth.png';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

function SignupPage() {
  const { t } = useTranslation();
  const auth = useAuth();
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const requestState = useSelector((state) => state.app.requestState);

  const handleClick = (e) => {
    e.preventDefault();
    history.replace({ pathname: routes.loginPagePath() });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, t('errors.min3'))
        .max(20, t('errors.max20'))
        .required(t('errors.required')),
      password: Yup.string()
        .min(6, t('errors.min6'))
        .required(t('errors.required')),
      password_confirmation: Yup.string()
        .required(t('errors.required'))
        .oneOf([Yup.ref('password'), null], t('errors.confirmation')),
    }),
    onSubmit: async (values) => {
      dispatch(setRequestState('processing'));
      try {
        await auth.signup(values);
        setInvalid(false);
        history.replace({ pathname: routes.chatPagePath() });
      } catch (e) {
        if (e.response.status === 409) {
          auth.logout();
          setInvalid(true);
        } else {
          toast(t('errors.network'), { type: 'error' });
        }
      }
      dispatch(setRequestState('idle'));
    },
  });

  return (
    <Card style={{ width: '40rem' }} className="position-absolute top-50 start-50 translate-middle">
      <Card.Header as="h2">{t('auth.registration')}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <Image src={imgSignup} />
          </Col>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>{t('auth.username')}</Form.Label>
                <Form.Control
                  name="username"
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

              <Form.Group className="mb-3" controlId="password_confirmation">
                <Form.Label>{t('auth.confirmation')}</Form.Label>
                <Form.Control
                  name="password_confirmation"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password_confirmation}
                />
                {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                  <Form.Text className="text-danger">
                    {formik.errors.password_confirmation}
                  </Form.Text>
                ) : null}
              </Form.Group>

              {invalid && <div className="text-danger mb-3">{t('errors.userExists')}</div>}

              <Button variant="primary" type="submit" disabled={requestState === 'processing'}>
                {t('auth.register')}
              </Button>
              <ToastContainer />
            </Form>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-center">
        <Card.Link href="/login" onClick={handleClick} className="text-decoration-none">{t('auth.enter')}</Card.Link>
      </Card.Footer>
    </Card>
  );
}

export default SignupPage;
