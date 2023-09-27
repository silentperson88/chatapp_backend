/* packages */
const bcrypt = require('bcryptjs');
const constantUtils = require('../utils/constants.utils');
const { response } = require('../utils/response.utils');
const userService = require('../services/user.service');
const authMiddleware = require('../middlewares/auth.middleware');

// Create User
exports.createUser = async (req, res) => {
  const reqBody = req.body;
  const { firstName, lastName, email, password, confirmPassword } = reqBody;
  try {
    const isExists = await userService.getUserByEmail(email.toLowerCase());
    if (isExists) {
      return response(res, 400, constantUtils.EMAIL_ALREADY_EXISTS);
    }
    if (password !== confirmPassword) {
      return response(res, 400, constantUtils.PASSWORD_NOT_MATCHED);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const admin = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hash,
    };
    const newUser = await userService.createUser(admin);
    if (newUser) {
      return response(res, 200, constantUtils.SUPERADMIN_REGISTER_SUCCESS, newUser);
    }
    return response(res, 400, constantUtils.SUPERADMIN_REGISTER_FAILED, newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmail(email.toLowerCase());

    if (!user) {
      return response(res, 400, constantUtils.USER_NOT_REGISTERED);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response(res, 400, constantUtils.INVALID_PASSWORD);
    }

    // Passing payload as userId to generate token.
    let token = await authMiddleware.assignToken(user);

    return response(res, 200, constantUtils.LOGIN_SUCCESS, { user, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reqBody = req.body;
    const { email } = reqBody;

    if (email) {
      const isExists = await userService.getUserByEmail(email.toLowerCase());

      if (isExists && isExists._id != userId) {
        return response(res, 400, constantUtils.EMAIL_ALREADY_EXISTS);
      }
    }

    const user = await userService.updateUser(userId, reqBody);

    if (!user) {
      return response(res, 400, constantUtils.USER_NOT_FOUND);
    }

    return response(res, 200, constantUtils.USER_UPDATED, user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get User By Id
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await userService.getUserById(userId);

    response(res, 200, constantUtils.USER_RETRIVED, user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    response(res, 200, constantUtils.USER_RETRIVED_SUCCESSFULLY, users);
  } catch (error) {
    res.status(500).json({ error });
  }
};
