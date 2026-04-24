import { body, validationResult } from "express-validator";
const PRODUCT_CATEGORIES = ["men", "women", "kids"];

function validateRequests(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const validateProductData = [
  // ✅ NAME
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 120 })
    .withMessage("Max 120 characters allowed"),

  // ✅ DESCRIPTION
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),

  // ✅ CATEGORY
  body("category")
    .trim()
    .toLowerCase()
    .isIn(PRODUCT_CATEGORIES)
    .withMessage("Invalid category"),

  // ✅ BRAND
  body("brand").optional().isString().trim(),

  // ✅ SUBCATEGORY
  body("subCategory").optional().isString().trim(),


  // ✅ PRICE FIELDS
  body("amount")
    .notEmpty()
    .withMessage("Price amount is required")
    .isFloat({ min: 0 })
    .withMessage("Amount must be >= 0")
    .toFloat(),

  body("originalAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Original amount must be >= 0")
    .toFloat(),

  body("currency")
    .optional()
    .isIn(["INR", "USD", "EUR", "GBP", "JPY"])
    .withMessage("Invalid currency"),

  // ✅ VARIANTS (STRING → ARRAY)
  body("variants")
    .notEmpty()
    .withMessage("Variants required")
    .custom((value, { req }) => {
      let parsed;

      try {
        parsed = JSON.parse(value);
      } catch (err) {
        throw new Error("Variants must be valid JSON");
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("At least one variant is required");
      }

      // attach parsed to req for controller
      req.body.parsedVariants = parsed;

      return true;
    }),

  // ✅ VARIANT STRUCTURE VALIDATION
  body("variants").custom((_, { req }) => {
    const variants = req.body.parsedVariants;

    for (const v of variants) {
      if (!v.size || typeof v.size !== "string") {
        throw new Error("Variant size is required");
      }

      if (!v.color || typeof v.color !== "string") {
        throw new Error("Variant color is required");
      }

      if (v.stock != null && (isNaN(v.stock) || v.stock < 0)) {
        throw new Error("Variant stock must be >= 0");
      }
    }

    return true;
  }),

  // ✅ ATTRIBUTES
  body("attributes")
    .optional()
    .custom((value) => {
      if (typeof value !== "object" || Array.isArray(value)) {
        throw new Error("Attributes must be an object");
      }

      for (const val of Object.values(value)) {
        if (typeof val !== "string") {
          throw new Error("Attribute values must be strings");
        }
      }

      return true;
    }),

  validateRequests,
];
