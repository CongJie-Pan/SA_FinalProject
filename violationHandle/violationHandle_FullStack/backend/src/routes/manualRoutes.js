// 此檔案負責處理所有人工審核相關的路由配置
// 主要處理人工覆核違規記錄的更新操作

const express = require('express');
const manualController = require('../controllers/manualController');

const router = express.Router();

// 處理人工審核更新的路由
// 接收審核結果並更新資料庫中的記錄
router.post('/update', manualController.updateManualReview);

module.exports = router;
