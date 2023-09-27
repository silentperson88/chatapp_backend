/* models */
const messageModel = require('../models/message.model');

// Create Message
exports.sendMessage = async message => await messageModel.create(message);

// get Messages
exports.getAllMessagesByGroupId = async groupId => {
  return messageModel.find({
    groupId: groupId,
    isDeleted: false,
  });
};

// get message by id
exports.getMessageById = async messageId => {
  return messageModel.findOne({
    _id: messageId,
    isDeleted: false,
  });
};

// like message
exports.likeMessage = async messageId => {
  return messageModel.findOneAndUpdate({ _id: messageId }, { $inc: { like: 1 } }, { new: true });
};
