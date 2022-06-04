import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from './hooks/useApi.jsx';
import { channelsSelectors, hideModal } from './slices/index.js';

function ModalWindow() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const api = useApi();
  const channels = useSelector(channelsSelectors.selectAll);
  const show = useSelector((state) => state.modal.show);
  const type = useSelector((state) => state.modal.type);

  const title = {
    add: t('channels.addChannel'),
  };
  const buttonText = {
    add: t('submit'),
  };
  const inputVisible = {
    add: true,
  };
  const buttonVariant = {
    add: 'primary',
  };

  const handleClose = () => {
    dispatch(hideModal());
  };
  const [invalid, setInvalid] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const index = channels.findIndex((channel) => channel.name === values.name);
      if (index > -1) {
        setInvalid(true);
      } else {
        try {
          await api.addChannel(values);
        } catch (e) {
          toast(t('errors.network'), { type: 'error' });
        }
        resetForm();
        setInvalid(false);
        handleClose();
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title[type]}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          {inputVisible && <FormLabel htmlFor="name" className="visually-hidden">{t('channels.name')}</FormLabel>}
          {inputVisible && (
          <FormGroup className="mb-3">
            <FormControl
              id="name"
              name="name"
              type="text"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </FormGroup>
          )}
          {invalid && <div>{t('errors.channelExists')}</div>}
          <Button variant={buttonVariant[type]} type="submit">
            {buttonText[type]}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalWindow;
