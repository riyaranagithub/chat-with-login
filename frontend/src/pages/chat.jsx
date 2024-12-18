import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatBox from '../components/chat/chatBox';
import ChatInput from '../components/chat/chatInput';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
    }

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const sendMessage = (message) => {
    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div>
      <ChatBox messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
