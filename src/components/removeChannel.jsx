import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { socketContext } from '../init.jsx';

const RemoveChannel = (props) => {
  const { t } = useTranslation();
  const { id } = props;
  const socket = useContext(socketContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    socket.emit(
      "removeChannel",
      { id },
      (response) => {console.log(`remove channel - ${response.status}`);}
    );
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
              {t('yes')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RemoveChannel;
