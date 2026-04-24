import { body, validationResult } from "express-validator";

function validateRequests(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export const validateProductData = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 120 })
    .withMessage("Product name must not exceed 120 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number")
    .toFloat(),

  body("originalPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Original price must be a non-negative number")
    .toFloat(),

  body("originalPrice")
    .optional()
    .custom((value, { req }) => {
      if (value < req.body.price) {
        throw new Error(
          "Original price must be greater than or equal to price",
        );
      }
      return true;
    }),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["men", "women", "kids"])
    .withMessage("Category must be one of 'men', 'women', or 'kids'"),

  body("subCategory")
    .optional()
    .isString()
    .withMessage("Subcategory must be a string")
    .trim(),

  body("brand")
    .optional()
    .isString()
    .withMessage("Brand must be a string")
    .trim(),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Slug must be lowercase and hyphen-separated"),

  body("sellerId")
    .notEmpty()
    .withMessage("Seller ID is required")
    .isMongoId()
    .withMessage("Seller ID must be a valid MongoDB ObjectId"),

  body("variants")
    .isArray({ min: 1 })
    .withMessage("At least one variant is required"),

  body("variants.*.size")
    .isString()
    .withMessage("Variant size must be a string")
    .trim()
    .notEmpty()
    .withMessage("Variant size is required"),

  body("variants.*.color")
    .optional()
    .isString()
    .withMessage("Variant color must be a string")
    .trim()
    .notEmpty()
    .withMessage("Variant color is required"),

  body("variants.*.stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Variant stock must be a non-negative integer")
    .toInt(),

  body("variants.*.images")
    .optional()
    .isArray()
    .withMessage("Variant images must be an array"),

  body("variants.*.images.*.url")
    .optional()
    .isString()
    .withMessage("Image URL must be a string")
    .trim()
    .notEmpty()
    .withMessage("Image URL cannot be empty"),

  body("attributes")
    .optional()
    .isObject()
    .withMessage("Attributes must be an object"),

  validateRequests,
];
