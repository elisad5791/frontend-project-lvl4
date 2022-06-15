import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import {
  InputGroup, FormControl, Button, FormLabel, Image,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import useApi from '../hooks/useApi.jsx';
import useAuth from '../hooks/useAuth.jsx';
import imgSpinner from '../../assets/spinner.gif';

function MessageForm() {
  const auth = useAuth();
  filter.loadDictionary();
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.channels.activeChannel);
  const api = useApi();
  const [processing, setProcessing] = useState(false);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { username } = auth;
      const text = filter.clean(values.message);
      setProcessing(true);
      try {
        await api.sendMessage({ username, text, channelId: activeChannelId });
        resetForm();
      } catch (e) {
        toast(t('errors.network'), { type: 'error' });
      }
      setProcessing(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-3 border-top">
      <FormLabel htmlFor="message" className="visually-hidden" aria-label={t('messages.new')}>{t('messages.new')}</FormLabel>
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
        <Button type="submit" variant="outline-secondary" id="button-addon2" disabled={processing}>
          {processing ? <Image src={imgSpinner} width={16} height={16} /> : t('messages.send')}
        </Button>
      </InputGroup>
    </form>
  );
}

export default MessageForm;
