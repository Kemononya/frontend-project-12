import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../../slices/channelsSlice';
import { actions as messagesActions } from '../../slices/messagesSlice';
import routes from '../../routes';
import socket from '../../socket';
import ChannelsList from './ChannelsList';
import Messages from './Messages';
import ChatForm from './ChatForm';
import getModal from '../ModaleComponents/index';
import ChannelsTitle from './ChannelsTitle';

const renderModal = (changeState, setTask, stateModal) => {
  if (!stateModal.modal) {
    return null;
  }
  const ModalComponent = getModal(stateModal.modal);
  return <ModalComponent changeState={changeState} setTask={setTask} state={stateModal} />;
};

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
    // Подумать как правильно вынести верхние теги в какой-то общий компонент
    // Или может внутреннюю часть - контейнер перенести
    // Важно также правильно модульные окна расположить
    // Пока запихну всё вместе, обязательно потом поправить
    <>
      <div className="d-flex flex-column h-100">
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} className="col-md-2 border-end pt-5 px-0 bg-light">
              <ChannelsTitle />
              <ChannelsList setChannelId={setChannelId} curChannelId={curChannelId} />
            </Col>
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                <Messages curChannelId={curChannelId} />
                <ChatForm curChannelId={curChannelId} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {renderModal(changeState, setTask, state)}
    </>
  );
};

export default MainPage;
