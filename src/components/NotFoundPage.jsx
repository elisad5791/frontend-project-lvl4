import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
import img404 from '../../assets/eyes.png';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <h2>404</h2>
      <p>{t('errors.pageNotFound')}</p>
      <Image src={img404} />
    </div>
  );
}

export default NotFoundPage;
