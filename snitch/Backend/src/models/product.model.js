import mongoose from "mongoose";
import priceSchema from "./price.model.js";

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
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
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
    price: {
      type: priceSchema,
      required: true,
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

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
