const mongoose = require('mongoose');

// Membership Schema
const membershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Membership Model
module.exports = mongoose.model('membership', membershipSchema);
