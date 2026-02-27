const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: [true, "username Already exists"],
    required: [true, "password required"],
  },
  email:{
    type:String,
    unique:[true, "Email Already exists"],
    lowercase:true,
    required:[true ,"Email required"]
  },
  password: {
    type: String,
    required: [true, "password required"],
    select:false
  },
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp",
  }
  
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;