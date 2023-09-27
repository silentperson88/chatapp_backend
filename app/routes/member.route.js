const express = require('express');
const routes = express.Router();
const groupController = require('../controllers/group.controller');
const { validate } = require('../middlewares/validate.middleware');
const { verifyToken } = require('../middlewares/auth.middleware');

// get all groups by member id
routes.get('/', verifyToken, validate, groupController.getAllGroupsByMemberId);

// get members by group id
routes.get('/:groupId', verifyToken, validate, groupController.getAllMemberOfGroup);

module.exports = routes;
