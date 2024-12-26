const express = require('express'); // 引入 Express 框架
const router = express.Router(); // 創建一個新的路由器實例
const aiController = require('../controllers/aiController'); // 引入 AI 控制器

router.post('/recognize-plate', aiController.recognizePlate); // 定義 POST 路由，當請求 /recognize-plate 時，調用 recognizePlate 方法

module.exports = router; // 將路由器導出，以便在其他地方使用