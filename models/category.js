const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
    {
      category: {
        type: String,
        required: [true, "category  is required"],
      },
    },
    { timestamps: true }
  );
  const Category = mongoose.model("Category", userSchema);
  module.exports = Category;