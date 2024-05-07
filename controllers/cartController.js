const { Cart } = require("../models/cart.js");

const addToCart = async (req, res) => {
  try {
    let cartItem = new Cart(req.body);
    const savedCartItem = await cartItem.save();
    if (!savedCartItem) {
      return res.status(400).json({ success: false, message: "Failed to add to cart!" });
    }
    cartItem = await savedCartItem.populate("product");

    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const fetchCartByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const cartItems = await Cart.find({ userId }).populate("product");
    if (!cartItems) {
      return res.status(400).json({ success: false, message: "Failed to fetch cart!" });
    }
    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCartItem = await Cart.findByIdAndDelete(id);
    if (!deletedCartItem) {
      return res.status(400).json({ success: false, message: "Failed to delete cart item!" });
    }
    res.status(200).json({ success: true, deletedCartItem });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    let cartItem = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    cartItem = await cartItem.populate("product");
    if (!cartItem) {
      return res.status(400).json({ success: false, message: "Failed to update cart item!" });
    }
    res.status(200).json({ success: true, cartItem });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addToCart,
  fetchCartByUser,
  deleteCartItem,
  updateCartItem,
};
