// src/controllers/violationController.js

const db = require('../config/database');

// 接收違規數據
exports.addViolation = async (req, res) => {
    const { ViolationID, CaptureTime, CaptureLocation, SpeedLimit, VehicleSpeed } = req.body;

    try {
        // 插入違規數據到資料庫
        await db.query('INSERT INTO EventBasicInfo (ViolationID, CaptureTime, CaptureLocation, SpeedLimit, VehicleSpeed) VALUES (?, ?, ?, ?, ?)', [
            ViolationID,
            CaptureTime,
            CaptureLocation,
            SpeedLimit,
            VehicleSpeed,
        ]);

        res.status(200).json({ message: 'Violation data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding violation data', error });
    }
};
