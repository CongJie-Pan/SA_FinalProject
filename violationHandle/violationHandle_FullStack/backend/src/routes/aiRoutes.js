// src/routes/aiRoutes.js

// 引入必要模組
const express = require('express');
const aiController = require('../controllers/aiController');

// 建立路由
const router = express.Router();

// 定義 AI 辨識的 POST 路由
router.post('/recognize', aiController.recognizePlate);

// 導出路由
module.exports = router;
