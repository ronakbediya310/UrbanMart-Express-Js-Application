const express = require('express');
const { registerController, loginController, getUserProfileController, logoutController, updateUserProfileController } = require('./controllers/authControllers');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route for user registration
router.post('/register', registerController);

// Route for user login
router.post('/login', loginController);

// Route for getting user profile (protected route, requires authentication)
router.get('/profile', authMiddleware, getUserProfileController);

// Route for updating user profile (protected route, requires authentication)
router.put('/profileupdate', authMiddleware, updateUserProfileController);

// Route for user logout
router.get('/logout', authMiddleware, logoutController);

module.exports = router;
