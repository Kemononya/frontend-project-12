import React from 'react';
import { useSelector } from 'react-redux';
import getModal from './index';

const ModalComponent = () => {
  const modalType = useSelector(({ modals }) => modals.channels);
  if (!modalType) {
    return null;
  }
  return (
    <>
      {getModal(modalType)}
    </>
  );
};

export default ModalComponent;
