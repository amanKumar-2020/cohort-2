import mongoose from "mongoose";
import priceSchema from "./price.model.js";
import slugify from "slugify";
import { nanoid } from "nanoid";

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
      trim: true,
    },
    subCategory: {
      type: String,
      default: "general",
      trim: true,
    },
    variants: [
      {
        color: {
          type: String,
          required: true,
          lowercase: true,
          trim: true,
        },
        colorSlug: { type: String },
        images: [
          {
            url: { type: String, required: true },
          },
        ],
        sizes: [
          {
            size: { type: String, required: true, uppercase: true, trim: true },
            stock: { type: Number, default: 0, min: 0 },
          },
        ],
      },
    ],
    slug: {
      type: String,
      unique: true,
    },
    attributes: [
      {
        key: String,
        value: String,
      },
    ],
    price: {
      type: priceSchema,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre("save", function () {
  if (this.isModified("name")) {
    const baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    this.slug = `${baseSlug}-${nanoid(6)}`;
  }

  //  Generate colorSlug for each variant
  if (this.isModified("variants")) {
    this.variants.forEach((variant) => {
      if (variant.color) {
        variant.colorSlug = slugify(`${this.name}-${variant.color}`, {
          lower: true,
          strict: true,
        });
      }
    });
  }
});
productSchema.path("variants").validate(function (variants) {
  const colors = variants.map((v) => v.color.toLowerCase());
  return new Set(colors).size === colors.length;
}, "Duplicate colors not allowed");

productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ "variants.color": 1 });
productSchema.index({ "price.amount": 1 });

productSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  if (update.variants) {
    update.variants = update.variants.map((variant) => {
      if (variant.color) {
        variant.colorSlug = slugify(`${update.name || ""}-${variant.color}`, {
          lower: true,
          strict: true,
        })
      }
      return variant;
    });
  }
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
