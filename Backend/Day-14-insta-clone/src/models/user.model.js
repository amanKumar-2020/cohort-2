const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "userName already exist"],
    required: [true, "username is required"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  email: {
    type: String,
    unique: [true, "already exist"],
    required: [true, "email is required"],
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp",
  },
  bio: String,
});

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;