import { validationResult } from "express-validator";

export function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    message: "Validation failed",
    success: false,
    errors: errors.array().map(({ msg, path, value }) => ({
      field: path,
      message: msg,
      value,
    })),
  });
}
