const postModel = require("../models/post.model");
const imagekit = require("../config/imagekit");
const { toFile } = require("@imagekit/nodejs");

async function createPostController(req, res) {
  console.log(req.user);
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    try {
      const result = await imagekit.files.upload({
        file: await toFile(req.file.buffer, "file"),
        fileName: req.file.originalname,
        folder: "/cohort-2-insta-clone-posts",
      });
      const postUpload = await postModel.create({
        imageURL: result.url,
        caption: req.body.caption,
        user: req.user.id,
      });
      res.status(201).json({
        message: "post created successful",
        postUpload,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server Error",
    });
  }
}

module.exports = { createPostController };
