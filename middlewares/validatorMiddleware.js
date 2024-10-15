const { validationResult } = require("express-validator");

const validatorMiddleware = (req, res, next) => {
  // finds the validattion in this request and wraps them in an object with handler funchtion
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validatorMiddleware;
