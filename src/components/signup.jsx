import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';

const Signup = () => {
  const { t } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  let history = useHistory();
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
      try {
        const { data } = await axios.post(routes.signupPath(), values);
        const authToken = { token: data.token };
        localStorage.setItem('userId', JSON.stringify(authToken));
        localStorage.setItem('username', values.username);
        setInvalid(false);
        history.replace({ pathname: "/" });
      } catch (e) {
        if (e.response.status === 409) {
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

      <label htmlFor="password_confirmation">{t('auth.confirmation')}</label>
      <input
        id="password_confirmation"
        name="password_confirmation"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password_confirmation}
      />
      {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
        <div>{formik.errors.password_confirmation}</div>
      ) : null}

      {invalid && <div>{t('errors.userexists')}</div>}

      <button type="submit">{t('submit')}</button>
      <ToastContainer />
    </form>
  );
};

export default Signup;
