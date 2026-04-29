import { Router } from "express";
import {
  validateLogin,
  validateRegister,
} from "../validator/auth.validator.js";
import {
  loginController,
  registerController,
  googleCallback,
  getMe,
} from "../controllers/auth.controller.js";
import passport from "passport";
import config from "../config/config.js";
import {authMiddlewareUser} from "../middleware/auth.middleware.js"
const router = Router();

router.post("/register", validateRegister, registerController);

router.post("/login", validateLogin, loginController);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.FRONTEND_URL}/login`,
  }),
  googleCallback,
);

/**
 * @route GET /api/auth/me
 * @description Get the authenticated user's profile
 * @access Private
 */
router.get("/me", authMiddlewareUser, getMe);

export default router;
