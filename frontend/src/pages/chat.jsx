import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatBox from '../components/chat/chatBox';
import ChatInput from '../components/chat/chatInput'; // Import default export
import UserSearch from '../components/chat/UserSearch'; // Import the UserSearch component
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
    } else {
      // Register the user upon connection
      socket.emit('registerUser', userInfo);
    }

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('receivePrivateMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const sendMessage = (message, toUsername) => {
    if (toUsername) {
      socket.emit('sendPrivateMessage', { toUsername, message });
    } else {
      socket.emit('sendMessage', message);
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const searchUsers = async (username) => {
    const response = await fetch(`http://localhost:5000/api/users/search?username=${username}`);
    const data = await response.json();
    setUsers(data);
  };

  return (
    <div>
      <UserSearch onSearch={searchUsers} users={users} />
      <ChatBox messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
