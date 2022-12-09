import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import routes from '../../routes';
import socket from '../../socket';
import ChannelsList from './ChannelsList';
import MessagesList from './MessagesList';
import ChatForm from './ChatForm';
import MessagesTitle from './MessagesTitle';

const MainPage = () => {
  const dispatch = useDispatch();

  const [curChannelId, setChannelId] = useState(1);

  useEffect(() => {
    const fetchInitData = async () => {
      const token = localStorage.getItem('userId');
      const response = await axios.get(routes.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
      const { channels, messages, currentChannelId } = response.data;
      setChannelId(currentChannelId);
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      socket.on('newMessage', (payload) => {
        dispatch(messagesActions.addMessage(payload));
      });
    };
    fetchInitData();
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
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
            <ChannelsList setChannelId={setChannelId} curChannelId={curChannelId} />
          </Col>
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <MessagesTitle />
              <MessagesList curChannelId={curChannelId} />
              <ChatForm curChannelId={curChannelId} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;
