const express = require("express")
const authController =require("../controller/auth.controller")

const appRouter =express.Router()

appRouter.post("/register",authController.registerController)
appRouter.post("/login",authController.loginController)

module.exports = appRouter;
