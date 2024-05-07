const express = require("express");
const router = express.Router();
const {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductImageController,
} = require("../controllers/productController");

// GET all products
router.get("/", getAllProductsController);

// GET product by ID
router.get("/:id", getProductByIdController);

// CREATE a new product
router.post("/", createProductController);

// UPDATE product image by ID
router.put("/image/:id", updateProductImageController);

module.exports = router;
