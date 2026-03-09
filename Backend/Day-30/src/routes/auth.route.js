import {Router} from "express";
import {registerController} from "../controller/auth.controller.js"
import handleError from "../middleware/error.middleware.js";

const authRouter = Router();

authRouter.post("/register",handleError,registerController)

export default authRouter;