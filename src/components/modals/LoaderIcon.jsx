import React from 'react';
import { Modal, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import imgLoader from '../../../assets/spinner.gif';

function LoaderIcon() {
  const isOpen = useSelector((state) => state.modal.isOpen);

  return (
    <Modal show={isOpen} fullscreen contentClassName="d-flex justify-content-center align-items-center opacity-50">
      <Image src={imgLoader} width={64} height={64} />
    </Modal>
  );
}

export default LoaderIcon;
