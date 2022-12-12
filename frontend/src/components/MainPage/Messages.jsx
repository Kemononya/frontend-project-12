import React from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '../../slices/messagesSlice';

const Messages = () => {
  const curChannelId = useSelector(({ channels }) => channels.curChannelId);
  /* const curChannel = useSelector(({ channels }) => (
    channels.channels.find(({ id }) => id === curChannelId)));
  const { name } = curChannel;
  */
  const messages = useSelector(selectors.selectAll)
    .filter(({ channelId }) => channelId === curChannelId);
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># name</b>
        </p>
        <span className="text-muted">{`${messages.length} сообщения`}</span>
      </div>
      <div className="chat-messages overflow-auto px-5">
        {messages.map(({ body, username, id }) => (
          <div className="text-break mb-2" key={id}>
            <b>{username}</b>
            {': '}
            {body}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
