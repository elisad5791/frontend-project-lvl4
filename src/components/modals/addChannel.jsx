import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form, FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi.jsx';
import { modalActions, channelsSelectors } from '../../slices/index.js';

function AddChannel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const api = useApi();
  const channels = useSelector(channelsSelectors.selectAll);

  const [invalid, setInvalid] = useState(false);
  const show = useSelector((state) => state.modal.show);

  const handleClose = () => {
    setInvalid(false);
    dispatch(modalActions.hideModal());
  };

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
        <Modal.Title>{t('channels.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormLabel htmlFor="name" className="visually-hidden">{t('channels.name')}</FormLabel>
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
          {invalid && <div className="text-danger mb-3">{t('errors.channelExists')}</div>}
          <Button variant="primary" type="submit">
            {t('submit')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddChannel;
