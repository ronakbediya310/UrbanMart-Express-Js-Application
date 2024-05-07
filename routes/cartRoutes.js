const express = require("express");
const router = express.Router();
const {
  addToCart,
  fetchCartByUser,
  deleteCartItem,
  updateCartItem,
} = require("../controllers/cartController.js");

router.post("/add", addToCart);
router.get("/fetch", fetchCartByUser);
router.delete("/delete/:id", deleteCartItem);
router.put("/update/:id", updateCartItem);

module.exports = router;