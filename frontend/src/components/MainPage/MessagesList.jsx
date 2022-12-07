import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/messagesSlice';

const MessagesList = ({ curChannelId }) => {
  console.log(curChannelId); // Добавить выборку сообщений по конкретному каналу
  const messages = useSelector(selectors.selectAll);
  return (
    <div className="chat-messages overflow-auto px-5">
      {messages.map(({ body, username, id }) => (
        <div className="text-break mb-2" key={id}>
          <b>{username}</b>
          :
          {body}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
