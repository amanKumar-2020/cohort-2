const express = require("express");
const postController = require("../controller/post.controller");
const upload = require("../middlewares/upload.middleware");

const postRouter = express.Router();

postRouter.post("/", upload.single("image"), postController.createPostController);

module.exports = postRouter;
