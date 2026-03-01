const postController = require("../controller/post.controller")
const express = require("express")

const postRouter = express.Router();


postRouter.post("/",postController.createPostController)

module.exports = postRouter;