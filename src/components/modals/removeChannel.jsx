import React from 'react';
import {
  Modal, Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { channelsActions, modalActions } from '../../slices/index.js';
import useApi from '../../hooks/useApi.jsx';

function RemoveChannel() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const api = useApi();
  const defaultChannelId = useSelector((state) => state.channels.defaultChannel);

  const data = useSelector((state) => state.modal.data);
  const show = useSelector((state) => state.modal.show);

  const handleClose = () => {
    dispatch(modalActions.hideModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.removeChannel(data);
    } catch (err) {
      toast(t('errors.network'), { type: 'error' });
    }
    dispatch(channelsActions.setActiveChannel(defaultChannelId));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Button variant="primary" type="submit">
            {t('channels.removeButton')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannel;
