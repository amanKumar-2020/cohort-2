const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middlewares/upload.middleware");

postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);
postRouter.get("/",postController.getPostController);

postRouter.get("/details/:postId",postController.getPostDetailsController);

module.exports = postRouter;
