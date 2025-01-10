const express = require('express');
const router = express.Router();
const finePaymentController = require('../controllers/finePaymentController');

// 添加中間件進行基本參數驗證
const validateTicketId = (req, res, next) => {
    const { ticketId } = req.params;
    
    if (!ticketId || isNaN(ticketId)) {
        return res.status(400).json({
            status: 'error',
            message: '無效的罰單ID格式',
            details: {
                providedId: ticketId,
                expectedFormat: '數字',
                timestamp: new Date().toISOString()
            }
        });
    }
    next();
};

// 使用驗證中間件
router.get('/fine-payment/:ticketId', 
    validateTicketId,
    async (req, res, next) => {
        try {
            await finePaymentController.getFinePaymentDetails(req, res);
        } catch (error) {
            next(error);
        }
    }
);

// 添加資料庫健康檢查路由
router.get('/health-check', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({ status: 'success', message: '資料庫連接正常' });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            message: '資料庫連接失敗',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// 錯誤處理中間件
router.use((error, req, res, next) => {
    console.error('Route error:', error);
    res.status(500).json({
        status: 'error',
        message: '路由處理過程中發生錯誤',
        details: {
            path: req.path,
            method: req.method,
            timestamp: new Date().toISOString(),
            errorMessage: error.message
        }
    });
});

module.exports = router;