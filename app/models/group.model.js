const mongoose = require('mongoose');

// Chat Group Schema
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Chat Group Model
module.exports = mongoose.model('group', groupSchema);
