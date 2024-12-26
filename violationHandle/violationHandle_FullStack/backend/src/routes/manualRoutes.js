// src/routes/manualRoutes.js

const express = require('express');
const manualController = require('../controllers/manualController');

const router = express.Router();

// 人工辨識的 POST 路由
router.post('/update', manualController.updateManualReview);

module.exports = router;
