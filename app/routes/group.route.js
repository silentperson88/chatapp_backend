const express = require('express');
const routes = express.Router();
const groupController = require('../controllers/group.controller');
const { validate } = require('../middlewares/validate.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');
const validator = require('../validators/group.validator');

// create group
routes.post(
  '',
  verifyToken,
  validator.createGroupValidationRule(),
  validate,
  groupController.createGroup
);

// get group
routes.get('/', verifyToken, validate, groupController.getAllGroups);

// get group by id
routes.get('/:groupId', verifyToken, validate, groupController.getGroupById);

// update group
routes.patch('/:groupId', verifyToken, validate, groupController.updateGroup);

// delete group
routes.delete('/:groupId', verifyToken, validate, groupController.deleteGroup);

// add member
routes.post('/:groupId/members', verifyToken, validate, groupController.addMember);

// remove member
routes.delete('/:groupId/members/:userId', verifyToken, validate, groupController.removeMember);

// send Message
routes.post('/:groupId/chat', verifyToken, validate, groupController.sendMessage);

// get chat
routes.get('/:groupId/chat', verifyToken, validate, groupController.getAllMessagesByGroupId);

// like chat
routes.post('/:groupId/chat/:chatId/like', verifyToken, validate, groupController.likeMessage);

module.exports = routes;
