import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import {
  Container, Row, Col, Form, InputGroup, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import routes from '../routes';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';

const MainPage = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      console.log(message);
    },
  });

  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => {
    const fetchInitData = async () => {
      const token = localStorage.getItem('userId');
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
      const { channels, messages } = response.data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchInitData();
    inputRef.current.focus();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} className="col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>
              Каналы
            </span>
            <Button className="p-0 text-primary btn-group-vertical" variant="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ChannelsList />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># general</b>
              </p>
              <span className="text-muted">3 сообщения</span>
            </div>
            <MessagesList />
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
