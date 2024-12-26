/* 這些代碼片段展示了一個使用 Express 框架構建的 Node.js 應用程序
該應用程序設置了多個 API 路由來處理違規和罰單數據，並與 MySQL 數據庫進行交互。
app.js 配置了中介軟體和靜態資源，server.js 啟動了服務器並處理生產和開發模式下的靜態資源。
database.js 則設置了 MySQL 連接池，violationRoutes.js 定義了違規相關的 API 路由。*/

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET all violations
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT ViolationID, CaptureLocation, CaptureTime FROM EventBasicInfo');
        console.log('Fetched violations:', rows); // 添加這行來檢查獲取的數據
        res.json(rows);
    } catch (error) {
        console.error('Error fetching violations:', error);
        res.status(500).json({ message: 'Error fetching violations', error: error.message });
    }
});

// 同樣檢查罰單的路由
router.get('/tickets', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT TicketID, LicensePlate, FineAmount FROM TicketInfo');
        console.log('Fetched tickets:', rows); // 添加這行來檢查獲取的數據
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
});

// POST a new violation
router.post('/', async (req, res) => {
    const { deviceID, captureTime, captureLocation } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO EventBasicInfo (DeviceID, CaptureTime, CaptureLocation) VALUES (?, ?, ?)',
            [deviceID, captureTime, captureLocation]
        );
        res.status(201).json({ id: result.insertId, message: 'Violation added successfully' });
    } catch (error) {
        console.error('Error adding violation:', error);
        res.status(500).json({ message: 'Error adding violation', error: error.message });
    }
});

module.exports = router;