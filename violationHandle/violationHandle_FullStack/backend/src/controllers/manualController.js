/**
 * 人工審核處理的控制器，用於處理需要人工介入的車牌辨識案件。
 * 提供人工覆核機制，允許管理員手動更新或修正系統無法準確辨識的車牌號碼。
 */

const db = require('../config/database');

// 更新人工審核結果的處理函數
exports.updateManualReview = async (req, res) => {
    // 從請求中獲取違規ID和人工確認的車牌號碼
    const { ViolationID, LicensePlate } = req.body;

    try {
        // 更新 EventBasicInfo 資料表中的車牌號碼
        // 使用人工確認的車牌號碼覆蓋原有資料
        await db.query('UPDATE EventBasicInfo SET LicensePlate = ? WHERE ViolationID = ?', [
            LicensePlate,
            ViolationID,
        ]);

        // 在處理日誌中記錄此次人工審核操作
        // 包含違規ID、處理行為和處理時間
        await db.query('INSERT INTO ProcessingLog (ViolationID, Action, ProcessedTime) VALUES (?, ?, NOW())', [
            ViolationID,
            '人工辨識完成',
        ]);

        // 回傳成功訊息
        res.status(200).json({ message: 'Manual review updated successfully' });
    } catch (error) {
        // 發生錯誤時回傳 500 狀態碼和錯誤訊息
        res.status(500).json({ message: 'Error updating manual review', error });
    }
};
