const express = require('express');
const router = express.Router();
const finePaymentController = require('../controllers/finePaymentController');

// 獲取完整的罰單繳納資訊
router.get('/fine-payment/:ticketId', finePaymentController.getFinePaymentDetails);

module.exports = router;