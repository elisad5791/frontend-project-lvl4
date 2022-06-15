import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form, FormLabel, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useApi from '../../hooks/useApi.jsx';
import { actions, selectors } from '../../slices/index.js';
import imgSpinner from '../../../assets/spinner.gif';

function RenameChannel() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const api = useApi();
  const channels = useSelector(selectors.channels.selectAll);

  const [invalid, setInvalid] = useState(false);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const channel = useSelector((state) => state.modal.data);
  const [processing, setProcessing] = useState(false);

  const handleClose = () => {
    setInvalid(false);
    dispatch(actions.hideModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const index = channels.findIndex((item) => item.name === values.name);
      if (index > -1) {
        setInvalid(true);
      } else {
        setProcessing(true);
        try {
          await api.renameChannel({ id: channel.id, name: values.name });
        } catch (e) {
          toast(t('errors.network'), { type: 'error' });
        }
        setProcessing(false);
        resetForm();
        setInvalid(false);
        handleClose();
      }
    },
  });

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
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
          <Button variant="primary" type="submit" disabled={processing}>
            {processing ? <Image src={imgSpinner} width={16} height={16} /> : t('submit')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannel;
