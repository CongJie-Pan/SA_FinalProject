/**
 * 違規事件基本資料的控制器，負責處理所有違規事件的新增和管理。
 * 主要功能是接收測速照相機捕獲的違規資料，並將其存儲到資料庫中。
 */

const db = require('../config/database');

// 新增違規資料的處理函數
exports.addViolation = async (req, res) => {
    // 從請求主體中解構需要的資料
    const { ViolationID, CaptureTime, CaptureLocation, SpeedLimit, VehicleSpeed } = req.body;

    try {
        // 將違規資料插入到 EventBasicInfo 資料表中
        // ViolationID: 違規事件唯一識別碼
        // CaptureTime: 違規發生時間
        // CaptureLocation: 違規發生地點
        // SpeedLimit: 該路段速限
        // VehicleSpeed: 車輛實際行駛速度
        await db.query('INSERT INTO EventBasicInfo (ViolationID, CaptureTime, CaptureLocation, SpeedLimit, VehicleSpeed) VALUES (?, ?, ?, ?, ?)', [
            ViolationID,
            CaptureTime,
            CaptureLocation,
            SpeedLimit,
            VehicleSpeed,
        ]);

        // 回傳成功訊息
        res.status(200).json({ message: 'Violation data added successfully' });
    } catch (error) {
        // 發生錯誤時回傳 500 狀態碼和錯誤訊息
        res.status(500).json({ message: 'Error adding violation data', error });
    }
};
