import React from 'react';

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box border border-gray-300 rounded-lg p-4 h-64 overflow-y-scroll bg-white shadow-md">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className={`message my-2 p-2 rounded-md ${
              index % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No messages yet. Start the conversation!</div>
      )}
    </div>
  );
};

export default ChatBox;
