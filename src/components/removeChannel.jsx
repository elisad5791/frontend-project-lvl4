import React, { useState, useContext } from 'react';
import {
  Modal, Button, Form, Dropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../slices/appSlice.js';
import socketContext from '../contexts/context.jsx';

function RemoveChannel(props) {
  const dispatch = useDispatch();
  const defaultChannelId = useSelector((state) => state.app.defaultChannel);
  const { t } = useTranslation();
  const { id } = props;
  const socket = useContext(socketContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit(
      'removeChannel',
      { id },
      (response) => { console.log(`remove channel - ${response.status}`); },
    );
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
            <Button variant="primary" type="submit">
              {t('channels.removeButton')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RemoveChannel;
