const express = require("express")
const authController =require("../controller/auth.controller")

const appRouter =express.Router()

appRouter.post("/register",authController.registerController)

module.exports = appRouter;
