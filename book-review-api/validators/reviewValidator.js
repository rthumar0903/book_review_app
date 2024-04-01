const { body, validationResult } = require("express-validator");

const reviewValidationRules = () => [
  body("user").notEmpty(),
  body("rating").isInt({ min: 1, max: 5 }),
  body("comment").notEmpty(),
];

const validateReview = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = { reviewValidationRules, validateReview };
