import express from "express"
import {
  registerUserValidator,
} from "../validator/auth.validator.js";
import { registerUser, verifyEmail ,loginUser} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register",registerUserValidator,registerUser)
authRouter.post("/login",loginUser)
authRouter.get("/verify-email",verifyEmail)


export default authRouter;
