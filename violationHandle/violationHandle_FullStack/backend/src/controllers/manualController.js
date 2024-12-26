// src/controllers/manualController.js

const db = require('../models/db');

// 人工辨識 - 更新資料
exports.updateManualReview = async (req, res) => {
    const { ViolationID, LicensePlate } = req.body;

    try {
        // 更新違規事件中的車牌號碼
        await db.query('UPDATE EventBasicInfo SET LicensePlate = ? WHERE ViolationID = ?', [
            LicensePlate,
            ViolationID,
        ]);

        // 紀錄人工辨識處理
        await db.query('INSERT INTO ProcessingLog (ViolationID, Action, ProcessedTime) VALUES (?, ?, NOW())', [
            ViolationID,
            '人工辨識完成',
        ]);

        res.status(200).json({ message: 'Manual review updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating manual review', error });
    }
};
