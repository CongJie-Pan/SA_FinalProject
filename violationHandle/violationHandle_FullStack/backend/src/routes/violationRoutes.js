// src/routes/violationRoutes.js

const express = require('express');
const violationController = require('../controllers/violationController');

const router = express.Router();

// 違規數據新增的 POST 路由
router.post('/add', violationController.addViolation);

module.exports = router;
