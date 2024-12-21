const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Add this line
const { Server } = require('socket.io');
const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Add this line

// Store connected users
let users = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('registerUser', (user) => {
    users[user.userId] = { socketId: socket.id, username: user.username };
  });

  socket.on('sendPrivateMessage', ({ toUsername, message }) => {
    const recipient = Object.values(users).find(user => user.username === toUsername);
    if (recipient) {
      io.to(recipient.socketId).emit('receivePrivateMessage', message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove user from the users object
    for (let userId in users) {
      if (users[userId].socketId === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
