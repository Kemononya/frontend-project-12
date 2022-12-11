import React from 'react';
import {
  Button, Dropdown, Nav, ButtonGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../slices/channelsSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const channelsList = useSelector(({ channels }) => channels.channels);
  const curChannelId = useSelector(({ channels }) => channels.curChannelId);
  return (
    <Nav as="ul" className="flex-column nav-pills nav-fill px-2">
      {channelsList.map(({ id, name, removable }) => (
        <Nav.Item as="li" className="w-100" key={id}>
          {!removable && (
          <Button
            className="w-100 rounded-0 text-start"
            variant={id === curChannelId ? 'secondary' : ''}
            onClick={() => dispatch(actions.setCurChannelId(id))}
          >
            <span className="me-1">#</span>
            {name}
          </Button>
          )}
          {removable && (
          <Dropdown as={ButtonGroup} className="d-flex">
            <Button
              className="w-100 rounded-0 text-start text-truncate"
              variant={id === curChannelId ? 'secondary' : ''}
              onClick={() => dispatch(actions.setCurChannelId(id))}
            >
              <span className="me-1">#</span>
              {name}
            </Button>
            <Dropdown.Toggle
              split
              variant={id === curChannelId ? 'secondary' : ''}
              className="flex-grow-0"
            >
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Удалить</Dropdown.Item>
              <Dropdown.Item>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          )}
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ChannelsList;
