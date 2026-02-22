const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middlewares/upload.middleware");

postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);
postRouter.get("/",postController.getPostController)

module.exports = postRouter;
