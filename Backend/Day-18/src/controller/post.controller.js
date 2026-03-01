const postModel = require("../models/post.model");

async function createPostController(req,res) {
  try {
   
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message :"server Error"
    })
  }
}

module.exports ={createPostController};