const mongoose = require('mongoose');

// Chat Schema
const chatSchema = new mongoose.Schema({
  message: {
    type: String,
    default: '',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
  },
  like: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Chat Model
module.exports = mongoose.model('chat', chatSchema);
