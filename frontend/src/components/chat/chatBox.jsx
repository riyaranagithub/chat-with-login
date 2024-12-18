import React from 'react';

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box border rounded p-4 h-64 overflow-y-scroll bg-gray-100">
      {messages.map((message, index) => (
        <div key={index} className="message my-2">
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
