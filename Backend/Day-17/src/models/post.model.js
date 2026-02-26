const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  imgURL: {
    type: String,
    required: [true, "image required for Creating post"],
  },
  caption:{
    type:String,
    default: ""
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true ,"user is required to create post"]
  }
});

const postModel = mongoose.model("post",postSchema);

module.exports = postModel;