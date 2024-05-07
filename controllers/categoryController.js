const Category = require("../models/category");

// Controller for creating a new category
exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    // Check if category already exists
    const existingCategory = await Category.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }
    // Create a new category
    const newCategory = new Category({ category });
    await newCategory.save();
    res.status(201).json({ success: true, message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for fetching all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for deleting a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    // Delete the category
    await Category.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Controller for updating a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category: updatedCategory } = req.body;
    // Check if the category exists
    let category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    // Update the category
    category.category = updatedCategory;
    await category.save();
    res.status(200).json({ success: true, message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
