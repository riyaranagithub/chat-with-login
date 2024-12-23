import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ChatBox from '../components/chat/chatBox';
import ChatInput from '../components/chat/chatInput';
import UserSearch from '../components/chat/UserSearch';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipient, setRecipient] = useState(null); // Track the selected user
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData')); // Use sessionStorage
    console.log(userData);
    if (!userData) {
      navigate('/login'); // Redirect if no user is logged in
    } else {
      socket.emit('registerUser', userData);
    }

    // Handle message events
    socket.on('receiveMessage', (message) => {
      console.log('Received message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('receivePrivateMessage', (message) => {
      console.log('Received private message:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    
        // Find the user by socketId and mark them as disconnected
        for (let userId in users) {
          if (users[userId].socketId === socket.id) {
            users[userId].isConnected = false; // Mark as disconnected
            console.log('Updated user status:', userId, users[userId]);
            break;
          }
        }
    
        console.log('Updated users after disconnect:', users);
      });
    };
  }, [navigate]);

  const sendMessage = (message) => {
    
    if (recipient) {
      console.log('Sending message:', message,recipient);
      // Send private message if a recipient is selected
      socket.emit('sendPrivateMessage', { toUsername: recipient, message });
    } else {
      // Send general message if no recipient is selected
      socket.emit('sendMessage', message);
    }
    setMessages((prevMessages) => [...prevMessages, message]); // Update the message list
  };

  const searchUsers = async (username) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/search?username=${username}`);
      const data = await response.json();
      setUsers(data); // Update the user search results
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="chat-container">
      <UserSearch
        onSearch={searchUsers}
        users={users}
        onSelectUser={setRecipient} // Pass the setRecipient function
        selectedUser={recipient} // Pass the currently selected user
      />
      {recipient && (
        <div className="recipient-info text-center p-2 bg-gray-100">
          <strong>Chatting with: </strong>{recipient}
        </div>
      )}
      <ChatBox messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
