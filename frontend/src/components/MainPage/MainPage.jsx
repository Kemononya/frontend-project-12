import axios from 'axios';
import React, { useEffect } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import routes from '../../routes';
import socket from '../../socket';
import ChannelsTitle from './ChannelsTitle';
import ChannelsList from './ChannelsList';
import Messages from './Messages';
import ChatForm from './ChatForm';
import ModalComponent from '../ModalComponents/ModalComponent';
import Header from '../Header';
// Перенести подписку на сокеты куда-то где проходит инициализация
const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitData = async () => {
      const token = localStorage.getItem('userId');
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
      const { channels, messages, currentChannelId } = response.data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
      socket.on('newMessage', (payload) => {
        dispatch(messagesActions.addMessage(payload));
      });
      socket.on('newChannel', (payload) => {
        dispatch(channelsActions.addChannel(payload));
      });
      socket.on('renameChannel', (payload) => {
        dispatch(channelsActions.renameChannel(payload));
      });
      socket.on('removeChannel', (payload) => {
        dispatch(channelsActions.removeChannel(payload));
      });
    };
    fetchInitData();
  }, [dispatch]);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
              <ChannelsTitle />
              <ChannelsList />
            </Col>
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                <Messages />
                <ChatForm />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
      <ModalComponent />
    </>
  );
};

export default MainPage;
