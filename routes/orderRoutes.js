const express = require('express');
const router = express.Router();
const { placeOrder, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// POST /api/orders/place-order
router.post('/place-order', authMiddleware, placeOrder);

// GET /api/orders/:id
router.get('/:id', authMiddleware, getOrderById);

// GET /api/orders
router.get('/', authMiddleware, getAllOrders);

// PUT /api/orders/:id/update-status
router.put('/:id/update-status', authMiddleware, updateOrderStatus);

module.exports = router;
