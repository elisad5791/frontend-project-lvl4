import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl, Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { socketContext } from '../init.jsx';
import _ from 'lodash';


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
      const index = _.findIndex(channels, (o) => o.name === values.name);
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
      <Button variant="secondary" onClick={handleShow}>
        {t('channels.addbutton')}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channels.addchannel')}</Modal.Title>
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

export default AddChannel;
