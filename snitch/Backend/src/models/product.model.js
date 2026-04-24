import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: "Generic",
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "kids"],
      index: true,
      trim: true,
    },
    subCategory: {
      type: String,
      index: true,
      default: "general",
      trim: true,
    },
    variants: [
      {
        size: { type: String, required: true },
        color: { type: String, required: true },
        stock: { type: Number, default: 0, min: 0 },
        images: [
          {
            url: { type: String, required: true },
          },
        ],
      },
    ],
    slug: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    attributes: {
      type: Map,
      of: String,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
