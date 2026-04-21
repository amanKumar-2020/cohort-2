import { body, validationResult } from "express-validator";

function validateRequests(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateLogin = [
  // Email (optional but must be valid if present)
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  // Contact (optional but must not be empty if present)
  body("contact")
    .optional()
    .notEmpty()
    .withMessage("Contact number is required"),

  // Custom check: at least one required
  body().custom((value) => {
    if (!value.email && !value.contact) {
      throw new Error("Either email or contact number is required");
    }
    return true;
  }),

  // Password (required)
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase, one lowercase, and one number",
    ),

  validateRequests,
];

export const validateRegister = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  body("contact").notEmpty().withMessage("Contact number is required"),
  body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),
  validateRequests,
];
