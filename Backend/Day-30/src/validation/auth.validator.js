import { body, validationResult } from "express-validator";

//creating a validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.this.status(400).json({
    errors: errors.array(),
  });
};

export const registerValidation = [
  body("username").isString().withMessage("username should be String"),
  body("email").isEmail().withMessage("Email should be valid Email address"),
  body("password")
    .custom((value) => {
      if (value.length < 6 && value.length > 12) {
        throw new Error("password must in between 6 and 12");
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordRegex.test(value)) {
        throw new Error(
          "password should contain at least one uppercase letter and one number",
        );
      }
      return true;
    })
    .withMessage(
      "password should be at least 6 characters long and contain at least one uppercase letter and one number",
    ),
  validate,
];

