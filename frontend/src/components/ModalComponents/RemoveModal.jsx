import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices/modalSlice';
import socket from '../../socket';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const id = useSelector(({ modals }) => modals.handledChannelId);
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = () => {
    setSubmitting(true);
    socket.emit('removeChannel', { id }, (response) => {
      console.log(response.status);
      setSubmitting(false);
    });
    dispatch(actions.setModalType(null));
  };

  return (
    <Modal centered show onHide={() => dispatch(actions.setModalType(null))}>
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={() => dispatch(actions.setModalType(null))}>Отменить</Button>
          <Button variant="danger" disabled={isSubmitting} onClick={submit}>Отправить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
