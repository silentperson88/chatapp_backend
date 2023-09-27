const express = require('express');
const routes = express.Router();
const userController = require('../controllers/user.controller');
const { validate } = require('../middlewares/validate.middleware');
const { verifyAdminToken } = require('../middlewares/auth.middleware');
const validator = require('../validators/admin.validator');

routes.post(
  '',
  verifyAdminToken,
  validator.createUserValidationRule(),
  validate,
  userController.createUser
);

// Login User
routes.post('/login', validator.loginValidationRule(), validate, userController.login);

// update user
routes.patch('/:userId', verifyAdminToken, validate, userController.updateUser);

// get user
routes.get('/', validate, userController.getAllUsers);

module.exports = routes;
