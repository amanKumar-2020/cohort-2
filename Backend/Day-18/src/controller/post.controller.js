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

async function getPostController(req,res) {
  console.log(req.user.id);
  
  try {
    const post = await postModel.find({user:req.user.id}).populate("user", "username email")
    if(!post){
      return res.status(400).json({
        message: "post not found",
      });
    }
    res.status(200).json({
      message:"post fetched",
      post
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"server error"
    })
    
  }
}

async function getPostDetailsController(req,res){
  try {
    const token = req.cookies.token
    if(!token){
      return res.status(401).json({
        message :"token not provided , unauthorized access"
      })
    }
    const userId =req.user.id;
    const postId = req.params.postId;
    const post = await postModel.findOne({_id:postId})
    
    if(!post){
      return res.status(404).json({
        message : "post not found"
      })
    }
    const isValidUser = userId ==post.user;
    
    if(!isValidUser){
      return res.status(403).json({
        message: "forbidden access",
      });
    }
    res.status(200).json({
      message :"post fetched",
      post
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"server error"
    })
  }
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
