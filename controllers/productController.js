const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;
const { getDataUri } = require("./../utils/features.js");
const multer = require("multer");

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept only image files
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
}).single("image");

// Get all products
const getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get product by Id
const getProductByIdController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product found successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// CREATE PRODUCT
const createProductController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }

      const { name, description, price, category, stock } = req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide an image" });
      }

      const file = getDataUri(req.file);
      const image = await uploadImageToCloudinary(file.content);

      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        imageUrl: image.secure_url,
      });

      await product.save();

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPDATE PRODUCT IMAGE
const updateProductImageController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res
          .status(500)
          .json({ success: false, message: "Image upload failed" });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide an image" });
      }

      const file = getDataUri(req.file);
      const image = await uploadImageToCloudinary(file.content);

      product.imageUrl = image.secure_url;
      await product.save();

      res.status(200).json({
        success: true,
        message: "Product image updated successfully",
        product,
      });
    });
  } catch (error) {
    console.error("Error updating product image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Helper function to upload image to Cloudinary
const uploadImageToCloudinary = async (imageData) => {
  try {
    return await cloudinary.uploader.upload(imageData);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Image upload to Cloudinary failed");
  }
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductImageController,
};
