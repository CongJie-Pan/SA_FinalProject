// 此檔案主要負責處理所有違規事件相關的API路由
// 包含獲取違規記錄、新增違規事件等功能的實現

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// 獲取所有違規事件的路由
// GET方法：從資料庫中檢索所有違規記錄
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

// 獲取所有罰單資訊的路由
// 從資料庫中檢索所有罰單相關資訊
router.get('/tickets', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT TicketID, ViolationID, FineAmount FROM TicketInfo');
        console.log('Fetched tickets:', rows); // 添加這行來檢查獲取的數據
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
});

// 新增違規事件的路由
// POST方法：接收前端傳來的違規資訊並存入資料庫
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