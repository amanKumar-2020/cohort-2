const postController = require("../controller/post.controller")
const express = require("express")
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware.js")

const postRouter = express.Router();


postRouter.post(
  "/",
  authMiddleware,
  upload.single("image"),
  postController.createPostController,
);
postRouter.get("/",authMiddleware,postController.getPostController)

module.exports = postRouter;