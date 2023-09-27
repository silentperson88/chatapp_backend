/* packages */
const messageService = require('../services/message.service');

exports.sendMesage = (group, io, socket) => {
  socket.on(`${group}/send-message`, async message => {
    const { groupId, sender, message: msg } = message;
    const newMessage = {
      message: msg,
      sender,
      groupId,
    };
    const messageData = await messageService.sendMessage(newMessage);
    if (messageData) {
      io.emit(`${group}/send-message`, messageData);
    }
  });
};

exports.likeMessage = (group, io, socket) => {
  socket.on(`${group}/like-message`, async message => {
    const { messageId } = message;
    const messageData = await messageService.likeMessage(messageId);
    if (messageData) {
      io.emit(`${group}/like-message`, { group, messageData });
    }
  });
};
