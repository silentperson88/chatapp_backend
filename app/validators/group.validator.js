const { body } = require('express-validator');

// Utils
const constantUtils = require('../utils/constants.utils');

exports.createGroupValidationRule = () => {
  return [
    body('name').isString().notEmpty().withMessage(constantUtils.INVALID_GROUP_NAME),
    body('description').isString().notEmpty().withMessage(constantUtils.INVALID_GROUP_DESCRIPTION),
  ];
};
