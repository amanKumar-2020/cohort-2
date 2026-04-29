import { body, param, validationResult } from "express-validator";
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
  body("price")
    .exists()
    .withMessage("Price amount is required")
    .bail(),

  // ✅ PRICE FIELDS
  // body("price.amount"||"price")
  //   .exists()
  //   .withMessage("Price amount is required")
  //   .bail()
  //   .isFloat({ min: 0 })
  //   .withMessage("Amount must be >= 0")
  //   .toFloat(),

  // body("price.originalAmount")
  //   .optional()
  //   .isFloat({ min: 0 })
  //   .withMessage("Original amount must be >= 0")
  //   .toFloat(),

  // body("price.currency")
  //   .optional()
  //   .isIn(["INR", "USD", "EUR", "GBP", "JPY"])
  //   .withMessage("Invalid currency"),

  // ✅ VARIANTS (STRING → ARRAY)
  body("variants")
    .notEmpty()
    .withMessage("Variants required")
    .custom((value, { req }) => {
      let parsed = value;

      if (typeof value === "string") {
        try {
          parsed = JSON.parse(value);
        } catch (err) {
          throw new Error("Variants must be valid JSON");
        }
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error("At least one variant is required");
      }

      req.body.parsedVariants = parsed;

      return true;
    }),

  // ✅ VARIANT STRUCTURE VALIDATION
  body("variants").custom((_, { req }) => {
    const variants = req.body.parsedVariants;

    for (const v of variants) {
      if (!v.color || typeof v.color !== "string") {
        throw new Error("Variant color is required");
      }

      if (!Array.isArray(v.images) || v.images.length === 0) {
        throw new Error("Variant images are required");
      }

      for (const img of v.images) {
        if (!img || typeof img.url !== "string" || img.url.trim() === "") {
          throw new Error("Variant image url is required");
        }
      }

      if (!Array.isArray(v.sizes) || v.sizes.length === 0) {
        throw new Error("Variant sizes are required");
      }

      for (const size of v.sizes) {
        if (!size.size || typeof size.size !== "string") {
          throw new Error("Variant size is required");
        }

        if (size.stock != null && (isNaN(size.stock) || size.stock < 0)) {
          throw new Error("Variant stock must be >= 0");
        }
      }
    }

    return true;
  }),

  // ✅ ATTRIBUTES
  body("attributes")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error("Attributes must be an array");
      }

      for (const attr of value) {
        if (!attr || typeof attr.key !== "string" || attr.key.trim() === "") {
          throw new Error("Attribute key is required");
        }

        if (
          !attr ||
          typeof attr.value !== "string" ||
          attr.value.trim() === ""
        ) {
          throw new Error("Attribute value is required");
        }
      }

      return true;
    }),

  validateRequests,
];

export const validateSlug = [
  param("slug")
    .trim()
    .notEmpty()
    .withMessage("Product slug is required")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Invalid product slug format"),

  validateRequests,
];
