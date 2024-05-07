const Order = require("../models/order");

// Controller for creating a new order
const placeOrder = async (req, res) => {
  try {
    const {
      checkoutEmail,
      billingAddress,
      billingState,
      billingZip,
      paymentMethod,
      totalAmount,
      userId,
      cart,
      cardholder,
      cardno,
      creditexpiry,
      cardcvv,
    } = req.body;
    // Create a new order
    const newOrder = new Order({
      checkoutEmail,
      billingAddress,
      billingState,
      billingZip,
      paymentMethod,
      totalAmount,
      userId,
      cart,
      cardholder,
      cardno,
      creditexpiry,
      cardcvv,
    });
    await newOrder.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Order created successfully",
        order: newOrder,
      });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for fetching all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller function for fetching an order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for updating an order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Order status updated successfully",
        order,
      });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for deleting an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
