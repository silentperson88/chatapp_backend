require('dotenv').config();
const jwt = require('jsonwebtoken');
const { firebaseHook2, firebaseHook } = require('../services/firebase.service');

// assign phone verification token
exports.assignPhoneToken = async uuid => {
  let token = await jwt.sign(
    {
      id: uuid,
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
    },
    { expiresIn: '24h' /* expires in 24 hours*/ }
  );
  return token;
};

// verfiy phone token
exports.verifyPhoneToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: false,
        message: 'Please send authentication token.',
      });
    }
    const decode = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    if (decode) {
      const user = await firebaseHook.auth().getUser(decode.id);
      if (user) {
        req.userData = user;
      } else {
        return res.status(400).json({
          status: false,
          message: 'User cannot access or no user exits',
        });
      }
    }
    return next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: 'Invalid token.',
    });
  }
};

// verfiy phone token2
exports.verifyPhoneToken2 = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: false,
        message: 'Please send authentication token.',
      });
    }
    const decode = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    if (decode) {
      const user = await firebaseHook2.auth().getUser(decode.id);
      if (user) {
        req.userData = user;
      } else {
        return res.status(400).json({
          status: false,
          message: 'User cannot access or no user exits',
        });
      }
    }
    return next();
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: 'Unauthorized access.',
    });
  }
};
