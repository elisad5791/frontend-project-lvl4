import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { InputGroup, FormControl, Button, FormLabel } from 'react-bootstrap';
import { socketContext } from '../init.jsx';

const MessageForm = () => {
  filter.loadDictionary();
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const socket = useContext(socketContext);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const username = localStorage.getItem('username');
      const text = filter.clean(values.message);
      values.message = '';
      socket.emit(
        "newMessage",
        { username, text, channelId: activeChannelId },
        (response) => {console.log(`new message - ${response.status}`);});
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
        <Button type="submit" variant="outline-secondary" id="button-addon2">
          {t('messages.send')}
        </Button>
      </InputGroup>
    </form>
  );
};

export default MessageForm;