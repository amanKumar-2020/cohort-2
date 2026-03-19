import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "ai"],
    },
  },
  {
    timestamps: true,
  },
);

const messageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default messageModel;