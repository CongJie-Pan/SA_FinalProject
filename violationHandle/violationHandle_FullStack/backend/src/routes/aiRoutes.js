// 此檔案負責處理所有AI自動辨識相關的路由設置，主要用於處理車牌影像的自動辨識請求
// 整合了AI模型辨識服務，提供REST API介面供前端調用車牌辨識功能

// 引入 Express 框架
const express = require('express'); 

// 創建一個新的路由器實例
const router = express.Router(); 

// 引入 AI 控制器
const aiController = require('../controllers/aiController'); 

// 定義 POST 路由，當請求 /recognize-plate 時，調用 recognizePlate 方法
router.post('/recognize-plate', aiController.recognizePlate); 

module.exports = router;