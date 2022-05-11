import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const Login = () => {
  const { t } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, t('errors.max15'))
        .required(t('required')),
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
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">{t('auth.username')}</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}

      <label htmlFor="password">{t('auth.password')}</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      {invalid && <div>{t('errors.auth')}</div>}

      <button type="submit">{t('submit')}</button>
      <ToastContainer />
    </form>
  );
};

export default Login;
