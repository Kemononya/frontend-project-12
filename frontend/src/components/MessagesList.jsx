import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../slices/messagesSlice';

const MessagesList = () => {
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
