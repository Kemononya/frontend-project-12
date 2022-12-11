import React, { useEffect, useRef } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';

const AddModule = () => {
  const channelsNames = useSelector(({ channels }) => channels.channels).map(({ name }) => name);
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: yup.object({
      body: yup.string().notOneOf(channelsNames).required(),
    }),
    onSubmit: ({ body }) => {
      console.log(body);
    },
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Modal show>
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
        <Button />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              name="body"
              ref={inputRef}
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="d-flex justify-content-end">
              <Button>Отменить</Button>
              <Button>Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModule;
