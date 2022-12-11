import React, { useEffect, useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices/modalSlice';
import socket from '../../socket';

const RenameModal = () => {
  const dispatch = useDispatch();
  const channelsNames = useSelector(({ channels }) => channels.channels).map(({ name }) => name);
  const id = useSelector(({ modals }) => modals.handledChannelId);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().notOneOf(channelsNames, 'Должно быть уникальным').required('Обязательное поле'),
    }),
    onSubmit: ({ name }) => {
      socket.emit('renameChannel', { name, id }, (response) => {
        console.log(response.status);
      });
      dispatch(actions.setModalType(null));
    },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal centered show onHide={() => dispatch(actions.setModalType(null))}>
      <Modal.Header closeButton>
        <Modal.Title>
          Переименовать канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              required
              name="name"
              ref={inputRef}
              value={formik.values.name}
              className="mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && formik.errors.name} // touched работает неправильно
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => dispatch(actions.setModalType(null))}>Отменить</Button>
              <Button type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
