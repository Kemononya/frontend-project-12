import React, { useEffect, useRef, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices/modalSlice';
import socket from '../../socket';

const RenameModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelsNames = useSelector(({ channels }) => channels.channelsList)
    .map(({ name }) => name);
  const id = useSelector(({ modals }) => modals.handledChannelId);
  const [isSubmitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().notOneOf(channelsNames, t('errors.unique')).required(t('errors.required')),
    }),
    onSubmit: ({ name }) => {
      setSubmitting(true);
      socket.emit('renameChannel', { name, id }, (response) => {
        console.log(response.status);
        setSubmitting(false);
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
          {t('modal.rename')}
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
            <Form.Label className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => dispatch(actions.setModalType(null))}>{t('modal.btnCancel')}</Button>
              <Button type="submit" disabled={isSubmitting}>{t('modal.btnSubmit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
