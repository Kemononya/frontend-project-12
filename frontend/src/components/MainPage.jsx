import React, { useEffect, useRef } from 'react';
import {
  Container, Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { fetchChannels } from '../slices/channelsSlice.js';

const MainPage = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }) => {
      console.log(message);
    },
  });

  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    dispatch(fetchChannels());
    inputRef.current.focus();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>
              Каналы
            </span>
          </div>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div>text</div>
            <div className="mt-auto px-5 py-3">
              <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                <InputGroup>
                  <Form.Control
                    ref={inputRef}
                    className="border-0 p-0 ps-2"
                    name="message"
                    placeholder="Введите сообщение..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />
                  <Button type="submit" className="btn-group-vertical">Отправить</Button>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
