const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatarURL: { type: String, required: true },
  messageContent: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  uid: { type: String, required: true },
});

messageSchema.post('save', function (doc, next) {
  console.log('New message saved:', doc);
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;