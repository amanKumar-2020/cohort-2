import { Router } from "express";
import { validateProductData } from "../validator/product.validator.js";
import {
  createProductController,
  getSellerProduct,
} from "../controllers/product.controller.js";
import { authMiddlewareSeller } from "../middleware/auth.middleware.js";
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

export default router;
