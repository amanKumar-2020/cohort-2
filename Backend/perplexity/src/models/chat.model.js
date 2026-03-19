import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chat: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default chatModel;