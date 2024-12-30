// 此檔案負責處理所有罰單相關的路由配置
// 實現了罰單的增刪改查等完整CRUD操作

const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// 獲取所有罰單列表
router.get('/', ticketController.getAllTickets);

// 根據ID獲取特定罰單詳情
router.get('/:id', ticketController.getTicketById);

// 創建新的罰單記錄
router.post('/', ticketController.generateTicket);

// 更新現有罰單信息
router.put('/:id', ticketController.updateTicket);

// 刪除指定罰單
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;