import { body } from "express-validator";
import { validateRequest } from "./validate-request.js";

export const registerUserValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("username can only contain letters, numbers, and underscore"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("please provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  validateRequest,
];

export const loginUserValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("password is required"),
  validateRequest,
];
