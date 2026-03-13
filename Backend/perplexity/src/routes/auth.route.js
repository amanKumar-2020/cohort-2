import express from "express"
import {
  registerUserValidator,
  loginUserValidator,
} from "../validator/auth.validator.js";
import { registerUser, verifyEmail } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register",registerUserValidator,registerUser)
authRouter.get("/verify-email",verifyEmail)

export default authRouter;