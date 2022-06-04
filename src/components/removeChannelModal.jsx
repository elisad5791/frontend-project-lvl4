import React, { useState } from 'react';
import {
  Modal, Button, Form, Dropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setActiveChannel } from '../slices/index.js';
import useApi from '../hooks/useApi.jsx';

function RemoveChannelModal(props) {
  const dispatch = useDispatch();
  const defaultChannelId = useSelector((state) => state.app.defaultChannel);
  const { t } = useTranslation();
  const { id } = props;
  const api = useApi();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.removeChannel({ id });
    } catch (err) {
      toast(t('errors.network'), { type: 'error' });
    }
    dispatch(setActiveChannel(defaultChannelId));
    handleClose();
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        {t('channels.removeButton')}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Button variant="danger" type="submit">
              {t('channels.removeButton')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RemoveChannelModal;
