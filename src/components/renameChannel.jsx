import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, Button, Form, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { socketContext } from '../init.jsx';

const RenameChannel = (props) => {
  const { t } = useTranslation();
  const { channel } = props;
  const socket = useContext(socketContext);
  const channels = useSelector((state) => state.channels.value);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [invalid, setInvalid] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: values => {
      const index = _.findIndex(channels, (o) => o.name === values.name);
      if (index > -1) {
        setInvalid(true);
      } else {
        socket.emit(
          "renameChannel",
          { id: channel.id, name: values.name },
          (response) => {console.log(`rename channel - ${response.status}`);}
        );
        values.name = '';
        setInvalid(false);
        handleClose();
      }
    },
  });
  return (
    <>
      <Dropdown.Item onClick={handleShow}>
        {t('channels.renameButton')}
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-3">
              <FormControl 
                id="name"
                name="name"
                type= "text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormGroup>
            {invalid && <div>{t('errors.channelexists')}</div>}
            <Button variant="primary" type="submit">
              {t('submit')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannel;
