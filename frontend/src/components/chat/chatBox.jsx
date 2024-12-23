import React, { useEffect, useRef } from 'react';

const ChatBox = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-box border border-gray-300 rounded-lg p-4 h-64 overflow-y-scroll bg-white shadow-md">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`message my-2 p-2 rounded-md ${
              message.private
                ? 'bg-purple-100 text-purple-800'
                : index % 2 === 0
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.message || message}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No messages yet. Start the conversation!</div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
