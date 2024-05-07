const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// Controller function for user registration 
const registerController = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Extract data from request body
    const { name, email, password, address, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already taken" });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      address,
      phone,
    });

    // Respond with success message
    res
      .status(201)
      .json({ success: true, message: "Registration Success", user: newUser });
  } catch (error) {
    console.error("Error in register API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Controller function for user login
const loginController = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all details" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and verify password
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token and set as cookie
    const token = user.generateToken();
    res.cookie("jwt", token, { httpOnly: true });

    // Respond with success message and user data
    res
      .status(200)
      .json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Controller function to get user profile
const getUserProfileController = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findById(req.user._id);

    // Respond with user profile data
    res
      .status(200)
      .json({ success: true, message: "User Profile fetched!", user });
  } catch (error) {
    console.error("Error in getUserProfile API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Controller function for user logout
const logoutController = async (req, res) => {
  try {
    // Clear JWT token cookie
    res.clearCookie("jwt");

    // Respond with success message
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Controller function to update user profile
const updateUserProfileController = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Extract user ID and updated profile data from request body
    const userId = req.user._id;
    const { name, email, address, phone } = req.body;

    // Find user by ID
    let user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update user profile fields
    user.name = name;
    user.email = email;
    user.address = address;
    user.phone = phone;

    // Save the updated user profile
    user = await user.save();

    // Respond with success message and updated user data
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateUserProfile API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Controller function for password reset
const passwordResetController = async (req, res) => {
  try {
    // Extract email, new password, and security answer from request body
    const { email, newPassword, answer } = req.body;

    // Validate request body
    if (!email || !newPassword || !answer) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    // Find user by email and security answer
    const user = await User.findOne({ email, securityAnswer: answer });

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or answer" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Error in passwordReset API:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  registerController,
  loginController,
  getUserProfileController,
  logoutController,
  updateUserProfileController,
  passwordResetController,
};
