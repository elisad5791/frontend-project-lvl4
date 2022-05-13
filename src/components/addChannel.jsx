import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { socketContext } from '../init.jsx';

const AddChannel = () => {
  const { t } = useTranslation();
  const socket = useContext(socketContext);
  const channels = useSelector((state) => state.channels.value);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [invalid, setInvalid] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => {
      const index = channels.findIndex((channel) => channel.name === values.name);
      if (index > -1) {
        setInvalid(true);
      } else {
        socket.emit(
          "newChannel",
          values,
          (response) => {console.log(`new channel - ${response.status}`);}
        );
        values.name = '';
        setInvalid(false);
        handleClose();
      }
    },
  });

  return (
    <>
      <p className="lead d-flex justify-content-between align-items-center">
        {t('channels.title')}
        <Button variant="outline" onClick={handleShow} className="p-1 fs-3 lh-1 text-primary">+</Button>
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.addChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-3">
              <FormControl 
                id="name"
                name="name"
                type= "text"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormGroup>
            {invalid && <div>{t('errors.channelExists')}</div>}
            <Button variant="primary" type="submit">
              {t('submit')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
