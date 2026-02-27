const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

function extractToken(req) {
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  if (req.headers["x-access-token"]) {
    return req.headers["x-access-token"];
  }

  return null;
}

async function createPostController(req, res) {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image required",
      });
    }

    const token = extractToken(req);
    if (!token) {
      return res.status(401).json({
        message: "Token not provided, unauthorized access",
      });
    }

    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        message: "User not authorized",
      });
    }

    const uploadedFile = await client.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: req.file.originalname || "upload",
      folder: "cohort-2-insta-clone-posts",
    });

    const post = await postModel.create({
      caption,
      imgURL: uploadedFile.url,
      user: decoded.id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = { createPostController };
