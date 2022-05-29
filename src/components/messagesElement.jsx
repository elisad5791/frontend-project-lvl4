import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

function MessagesElement(props) {
  const { messages } = props;

  useEffect(() => {
    scroll.scrollToBottom({ containerId: 'messages' });
  }, [messages]);

  return (
    <div className="bg-white p-3 flex-grow-1 overflow-auto" id="messages">
      {messages.map(({ id, username, text }) => (
        <p key={id}>
          <b>{username}</b>
          :
          {' '}
          {text}
        </p>
      ))}
    </div>
  );
}

export default MessagesElement;
