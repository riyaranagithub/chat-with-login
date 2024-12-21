const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Search for users by username
router.get('/search', async (req, res) => {
  const { username } = req.query;
  try {
    const users = await User.find({ username: new RegExp(username, 'i') });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
