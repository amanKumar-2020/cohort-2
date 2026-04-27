import { Router } from "express";
import {
  validateProductData,
  validateSlug,
} from "../validator/product.validator.js";
import {
  createProductController,
  getSellerProduct,
  getProduct,
  addVariants,
} from "../controllers/product.controller.js";
import {
  authMiddlewareSeller,
  authMiddlewareUser,
} from "../middleware/auth.middleware.js";
import multer from "multer";
import upload from "../middleware/upload.middleware.js";
// import config from "../config/config.js";

const router = Router();

/**
 * @route POST /api/products/create
 * @desc Create a new product (Seller only)
 * @access Private (Seller)
 */
router.post(
  "/create",
  upload.any(),
  validateProductData,
  authMiddlewareSeller,
  createProductController,
);

/**
 * @route GET /api/products
 * @desc Get all product form seller
 * @access private (seller)
 */
router.get("/", authMiddlewareSeller, getSellerProduct);

/**
 * @route GET /api/products/:slug
 * @des Get product by slug name
 * @access public
 */
router.get("/:slug", validateSlug, getProduct);

/**
 * @router PATCH /products/:productId/variants
 * @des add new variants of products
 * @access private (seller)
 */
router.patch("/:productId/variants", authMiddlewareSeller, addVariants);

export default router;
