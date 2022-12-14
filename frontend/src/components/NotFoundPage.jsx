import React from 'react';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from './Header';
import image from '../assets/NotFoundImg.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="text-center">
        <Image className="h-25" fluid src={image} alt={t('notFound.title')} />
        <h1 className="h4 text-muted">{t('notFound.title')}</h1>
        <p className="text-muted">
          {t('notFound.footerFirst')}
          <Link to="/">{t('notFound.footerSecond')}</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
