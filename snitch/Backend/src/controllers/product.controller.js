import ProductModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProductController(req, res) {
  try {
    const {
      name,
      description,
      category,
      variants,
      amount,
      originalAmount,
      currency,
      slug
    } = req.body;

    const parsedVariants = JSON.parse(variants);
    const seller = req.user;
    console.log(seller)

    const uploaded = await Promise.all(
      req.files.map((file) =>
        uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        }),
      ),
    );
    parsedVariants[0].images = uploaded.map((img) => ({
      url: img.url,
    }));
    const product = await ProductModel.create({
      name,
      description,
      category,
      variants: parsedVariants,
      price: {
        amount,
        originalAmount,
        currency,
      },
      sellerId: req.user._id,
      slug,
    });
    res.status(201).json({
      message: "product created successful!",
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
