const postModel = require("../models/post.model");
const { toFile } = require("@imagekit/nodejs");
const ImageKit = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  if (!req.file) {
    return res.status(400).json({ message: "Image required" });
  }
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not provided , Unauthorized access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "user not authorized",
    });
  }
  // console.log(decoded);

  const uploadedFile = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: uploadedFile.url,
    user: decoded.id,
  });
  res.status(201).json({
    message: "post created successful",
    post,
  });
}

async function getPostController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not provided , Unauthorized access",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "user not authorized",
    });
  }
  const posts = await postModel.find({
    user: decoded.id,
  });
  res.status(200).json({
    message: "All post of user",
    posts,
  });
}

module.exports = { createPostController, getPostController };
