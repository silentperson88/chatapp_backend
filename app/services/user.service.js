/* models */
const userModel = require('../models/user.model');

/* create user */
exports.createUser = async user => {
  return await userModel.create(user);
};

/* get by email */
exports.getUserByEmail = async email => {
  return userModel.findOne({
    email: email,
  });
};

/* get by mobile number */
exports.getUserByMobileNumber = async mobileNumber => {
  return userModel.findOne({
    mobileNumber: mobileNumber,
    isActive: true,
  });
};

/* check user already exist by email, phone number, and uid */
exports.checkUserExist = async (email, panCardNumber, mobileNumber, uid) => {
  return userModel.findOne({
    $or: [
      { email: email },
      { panCardNumber: panCardNumber },
      { mobileNumber: mobileNumber },
      { uid: uid },
    ],
    isActive: true,
  });
};

/* get by id */
exports.getUserById = async userId => {
  return userModel.findOne({
    _id: userId,
    isActive: true,
  });
};

/* update user */
exports.updateUser = async (userId, user) => {
  return await userModel.findOneAndUpdate({ _id: userId }, { $set: user });
};

/* get all users */
exports.getAllUsers = async () => {
  return userModel.find();
};
