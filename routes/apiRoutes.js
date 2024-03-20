const express = require('express');
const Message = require('../models/Message');
const router = express.Router();
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

// Import the avatar generator utility
const { generateAvatar } = require('../utils/avatarGenerator');

// Function to parse markdown content to HTML
function parseMarkdownToHtml(content) {
  return md.render(content);
}

// POST route to save chat messages
router.post('/messages', async (req, res) => {
  try {
    const { username, avatarURL, messageContent, uid } = req.body;

    if (!username || !avatarURL || !messageContent) {
      console.log("Validation failed: All fields are required.");
      return res.status(400).send('All fields are required');
    }

    // Save the original markdown content
    const message = await Message.create({
      username,
      avatarURL,
      messageContent,
      uid
    });

    // Parse markdown content to HTML for broadcasting
    const messageContentHtml = parseMarkdownToHtml(messageContent);

    // Emit the saved message to all connected clients
    req.app.locals.io.emit('chat message', {
      username: message.username,
      avatarURL: message.avatarURL,
      messageContent: messageContentHtml, // Emit the parsed HTML content
      uid: message.uid,
      timestamp: message.timestamp
    });

    console.log("Message saved and broadcasted successfully.");
    res.status(201).send('Message saved and broadcasted');
  } catch (error) {
    console.error('Error saving message:', error.message, error.stack);
    res.status(500).send(error.message);
  }
});

// New endpoint for avatar generation
router.get('/avatar', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    console.log("Username is required for avatar generation.");
    return res.status(400).send('Username is required');
  }

  try {
    // Use the avatar generator utility to generate avatar
    const avatarUrl = await generateAvatar(username);

    console.log("Avatar generated successfully.");
    // Return the avatar URL
    res.send({ avatarUrl });
  } catch (error) {
    console.error('Error generating avatar:', error.message, error.stack);
    res.status(500).send('Error generating avatar');
  }
});

// GET route to fetch chat history
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find({})
      .sort({ timestamp: -1 })
      .limit(50)
      .lean(); // sort by newest first and limit to 50 messages
    messages.reverse(); // reverse to display oldest first on the client-side

    // Parse each message's content to HTML
    const parsedMessages = messages.map(message => {
      let messageObject = message.toObject ? message.toObject() : message; // Convert to plain object if necessary
      messageObject.messageContent = parseMarkdownToHtml(messageObject.messageContent);
      return messageObject;
    });

    res.status(200).json(parsedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error.message, error.stack);
    res.status(500).send(error.message);
  }
});

module.exports = router;