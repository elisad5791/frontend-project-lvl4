/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import {
  InputGroup, FormControl, Button, FormLabel,
} from 'react-bootstrap';
import apiContext from '../contexts/apiContext.jsx';
import authContext from '../contexts/authContext.jsx';

function MessageForm() {
  const auth = useContext(authContext);
  filter.loadDictionary();
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const connection = useContext(apiContext);
  const buttonsBlocked = useSelector((state) => state.app.buttonsBlocked);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const username = auth.getUsername();
      const text = filter.clean(values.message);
      values.message = '';
      connection.sendMessage(
        { username, text, channelId: activeChannelId },
        (response) => { console.log(`new message - ${response.status}`); },
      );
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
        <Button type="submit" variant="outline-secondary" id="button-addon2" disabled={buttonsBlocked}>
          {t('messages.send')}
        </Button>
      </InputGroup>
    </form>
  );
}

export default MessageForm;
