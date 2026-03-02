const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "follower is required"],
  },
  followee: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"followee is required"]
  },
});

const followModel = mongoose.model("follow",followSchema);

module.exports = followModel