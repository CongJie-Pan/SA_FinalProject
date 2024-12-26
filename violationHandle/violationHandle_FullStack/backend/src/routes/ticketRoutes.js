// src/routes/ticketRoutes.js

const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

// 罰單生成的 POST 路由
router.post('/generate', ticketController.generateTicket);

module.exports = router;
