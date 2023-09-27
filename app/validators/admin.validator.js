const { body } = require('express-validator');

// Utils
const constantUtils = require('../utils/constants.utils');

exports.createUserValidationRule = () => {
  return [
    body('firstName').isString().notEmpty().withMessage(constantUtils.INVALID_FIRSTNAME),
    body('lastName').isString().notEmpty().withMessage(constantUtils.INVALID_LASTNAME),
    body('email')
      .isString()
      .isEmail()
      .withMessage(constantUtils.INVALID_EMAIL)
      .notEmpty()
      .withMessage(constantUtils.EMPTY_EMAIL),
    body('password')
      .isLength({ min: 8 })
      .withMessage(constantUtils.PASSWORD_MIN_LENGTH)
      .matches(constantUtils.PASSWORD_REGEX)
      .withMessage(constantUtils.INVALID_PASSWORD),
    body('confirmPassword')
      .isLength({ min: 8 })
      .withMessage(constantUtils.PASSWORD_MIN_LENGTH)
      .matches(constantUtils.PASSWORD_REGEX)
      .withMessage(constantUtils.INVALID_PASSWORD)
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(constantUtils.PASSWORD_MISMATCH);
        }
        return true;
      }),
  ];
};

exports.loginValidationRule = () => {
  return [
    body('email')
      .isString()
      .isEmail()
      .withMessage(constantUtils.INVALID_EMAIL)
      .notEmpty()
      .withMessage(constantUtils.EMPTY_EMAIL),
    body('password').isString().isLength({ min: 6 }).withMessage(constantUtils.PASSWORD_MIN_LENGTH),
  ];
};

exports.emailValidationRule = () => {
  return [
    body('email')
      .isString()
      .isEmail()
      .withMessage(constantUtils.INVALID_EMAIL)
      .notEmpty()
      .withMessage(constantUtils.EMPTY_EMAIL),
  ];
};
