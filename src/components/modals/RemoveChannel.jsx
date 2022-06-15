import React, { useState } from 'react';
import {
  Modal, Button, Form, Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { actions } from '../../slices/index.js';
import useApi from '../../hooks/useApi.jsx';
import imgSpinner from '../../../assets/spinner.gif';

function RemoveChannel() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const api = useApi();
  const defaultChannelId = useSelector((state) => state.channels.defaultChannel);

  const id = useSelector((state) => state.modal.data);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const [processing, setProcessing] = useState(false);

  const handleClose = () => {
    dispatch(actions.hideModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await api.removeChannel({ id });
    } catch (err) {
      toast(t('errors.network'), { type: 'error' });
    }
    setProcessing(false);
    dispatch(actions.setActiveChannel(defaultChannelId));
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Button variant="danger" type="submit" disabled={processing}>
            {processing ? <Image src={imgSpinner} width={16} height={16} /> : t('channels.removeButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannel;
