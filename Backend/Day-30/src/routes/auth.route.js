import {Router} from "express";
import {registerController} from "../controller/auth.controller.js"
// import handleError from "../middleware/error.middleware.js";
import {registerValidation} from "../validation/auth.validator.js"

const authRouter = Router();

authRouter.post("/register",registerValidation,registerController)

export default authRouter;