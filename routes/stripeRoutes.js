const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/stripeController');

router.post('/payment', processPayment);

module.exports = router;
