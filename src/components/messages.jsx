import React from 'react';

const Messages = (props) => {
  const { messages } = props;
  return (
    <div>
      {messages.map((message) => <p key={message.id}><b>{message.username}</b>: {message.text}</p>)}
    </div>
  );
};

export default Messages;