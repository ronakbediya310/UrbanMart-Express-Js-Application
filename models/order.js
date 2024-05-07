const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  checkoutEmail: { type: String, required: true },
  billingAddress: { type: String, required: true },
  billingState: { type: String, required: true },
  billingZip: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  placedOn: { type: Date, default: Date.now },
  deliveredOn: Date,
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, quantity: { type: Number, required: true } }],
  cardholder: { type: String, default: "" },
  cardno: { type: String, default: "" },
  creditexpiry: { type: String, default: "" },
  cardcvv: { type: String, default: "" },
});

module.exports = orderSchema;
