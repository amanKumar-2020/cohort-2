import express from "express"
import {
  registerUserValidator,
} from "../validator/auth.validator.js";
import { registerUser, verifyEmail ,loginUser , getMe} from "../controller/auth.controller.js";
import authUser from "../middleware/auth.middleware.js"
const authRouter = express.Router();

authRouter.post("/register",registerUserValidator,registerUser)
authRouter.post("/login",loginUser)
authRouter.get("/verify-email",verifyEmail)
authRouter.get("/get-me",authUser,getMe)


export default authRouter;
