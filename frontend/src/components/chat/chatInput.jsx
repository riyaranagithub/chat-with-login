import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() === '') return; // Prevent sending empty messages
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-md shadow-md">
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSendMessage}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput; // Ensure default export is present
