/* eslint-disable no-param-reassign */
import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import {
  InputGroup, FormControl, Button, FormLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import useApi from '../hooks/useApi.jsx';
import useAuth from '../hooks/useAuth.jsx';

function MessageForm() {
  const auth = useAuth();
  filter.loadDictionary();
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const api = useApi();
  const requestState = useSelector((state) => state.app.requestState);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      const { username } = auth;
      const text = filter.clean(values.message);
      values.message = '';
      try {
        await api.sendMessage({ username, text, channelId: activeChannelId });
      } catch (e) {
        toast(t('errors.network'), { type: 'error' });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-3 border-top">
      <FormLabel htmlFor="message" className="visually-hidden">{t('messages.new')}</FormLabel>
      <InputGroup>
        <FormControl
          id="message"
          name="message"
          type="text"
          required
          autoFocus
          placeholder={t('messages.newDots')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          aria-describedby="basic-addon2"
        />
        <Button type="submit" variant="outline-secondary" id="button-addon2" disabled={requestState === 'processing'}>
          {t('messages.send')}
        </Button>
      </InputGroup>
    </form>
  );
}

export default MessageForm;
