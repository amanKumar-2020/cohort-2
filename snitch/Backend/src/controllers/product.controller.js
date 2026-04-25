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
    } = req.body;

    const parsedVariants = JSON.parse(variants);
    const seller = req.user;
    console.log(seller);

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

export async function getSellerProduct(req, res) {
  try {
    const seller = req.user;
    const products = await ProductModel.find({ sellerId: seller._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "All product fetched from seller",
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error at fetching Product:", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function getProduct(req,res) {
  const slug = req.params.slug;
  const product = await ProductModel.findOne({slug});
  res.status(200).json({
    message:"Product fetched by slug",
    success:true,
    product
  })
}