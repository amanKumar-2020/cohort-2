import express from "express"
import {
  registerUserValidator,
  loginUserValidator,
} from "../validator/auth.validator.js";
import {registerUser} from "../controller/auth.controller.js"

const authRouter = express.Router();

authRouter.post("/register",registerUserValidator,registerUser)

export default authRouter;