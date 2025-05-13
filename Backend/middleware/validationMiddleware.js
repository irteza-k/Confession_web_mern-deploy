const { body, validationResult } = require('express-validator');
const { AppError } = require('./errorMiddleware');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new AppError('Invalid input data', 400);
    error.errors = errors.array();
    return next(error);
  }
  next();
};

// User validation rules
const userValidationRules = () => {
  return [
    body('username')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Username can only contain letters, numbers and underscores'),
    
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
  ];
};

// Confession validation rules
const confessionValidationRules = () => {
  return [
    body('confessionText')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Confession must be at least 10 characters long')
      .isLength({ max: 1000 })
      .withMessage('Confession cannot exceed 1000 characters')
  ];
};

module.exports = {
  validate,
  userValidationRules,
  confessionValidationRules
}; 