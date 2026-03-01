const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Image in required to create Post"],
    },
    caption: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "user is required to create post"],
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("psot", postSchema);

module.exports = postModel;
