import React, { useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const Messages = (props) => {
  const { messages } = props;

  useEffect(() => {
    scroll.scrollToBottom({ containerId: 'messages' });
  }, [messages]);

  return (
    <div className="bg-white p-3 flex-grow-1 overflow-auto" id="messages">
      {messages.map((message) => <p key={message.id}><b>{message.username}</b>: {message.text}</p>)}
    </div>
  );
};

export default Messages;