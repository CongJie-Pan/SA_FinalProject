// src/controllers/aiController.js

// 引入必要模組
const axios = require('axios');
const db = require('../config/database');

// AI 辨識處理邏輯
exports.recognizePlate = async (req, res) => {
    const { ViolationID, ViolationImage } = req.body;

    try {
        // 呼叫 Object Detection Agent
        const detectionResponse = await axios.post('http://localhost:8000/object-detection', {
            image: ViolationImage,
        });

        if (!detectionResponse.data.success) {
            throw new Error('目標偵測失敗');
        }

        const croppedImage = detectionResponse.data.croppedImage;

        // 呼叫 OCR Agent
        const ocrResponse = await axios.post('http://localhost:8000/ocr', {
            image: croppedImage,
        });

        if (!ocrResponse.data.success) {
            throw new Error('文字辨識失敗');
        }

        const licensePlate = ocrResponse.data.licensePlate;

        // 儲存辨識結果至資料庫
        await db.query('INSERT INTO AIRecognition (ViolationID, LicensePlate, Status) VALUES (?, ?, ?)', [
            ViolationID,
            licensePlate,
            '成功',
        ]);

        res.status(200).json({
            success: true,
            licensePlate,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
