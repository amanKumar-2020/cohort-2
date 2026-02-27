// const mongoose = require("mongoose")
const userModel = require("../models/user.model")
const express = require("express")
const authController = require("../controller/auth.controller")

const authRouter = express.Router()

authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginControler);

module.exports = authRouter;