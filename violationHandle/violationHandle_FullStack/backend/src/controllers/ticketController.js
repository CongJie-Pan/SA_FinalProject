/**
 * 提供罰單相關的後端處理功能，包括罰單的生成、查詢、更新和刪除
 * 負責處理與罰單資料庫的所有互動操作，確保罰單資料的正確儲存和管理
 */

const db = require('../config/database');

// 獲取所有罰單資料的功能
exports.getAllTickets = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM TicketInfo');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching all tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
};

// 根據ID獲取特定罰單的功能
exports.getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM TicketInfo WHERE TicketID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: '找不到指定的罰單' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching ticket by ID:', error);
        res.status(500).json({ message: 'Error fetching ticket', error: error.message });
    }
};

// 生成新罰單的功能
exports.generateTicket = async (req, res) => {
    const { ViolationID, FineAmount, CompletionTime, NotificationStatus } = req.body;

    try {
        // 首先檢查違規記錄是否存在於 EventBasicInfo 表中
        const [eventRows] = await db.query('SELECT * FROM EventBasicInfo WHERE ViolationID = ?', [ViolationID]);
        if (eventRows.length === 0) {
            return res.status(404).json({ message: '找不到指定的違規記錄' });
        }

        // 檢查 AI 辨識結果
        const [aiRows] = await db.query('SELECT * FROM AIRecognition WHERE ViolationID = ?', [ViolationID]);
        if (aiRows.length > 0 && aiRows[0].RecognitionResult === 'MANUAL_REVIEW') {
            return res.status(400).json({ message: '此違規記錄需要人工審核，無法自動生成罰單' });
        }

        // 獲取當前台北時間
        const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' });
        const taipeiTime = new Date(now);
        const formattedTaipeiTime = taipeiTime.toISOString().slice(0, 19).replace('T', ' ');

        // 插入罰單數據
        const [insertResult] = await db.query('INSERT INTO TicketInfo (ViolationID, FineAmount, CompletionTime, NotificationStatus) VALUES (?, ?, ?, ?)', [
            ViolationID,
            FineAmount,
            formattedTaipeiTime,
            NotificationStatus
        ]);

        // 更新處理日誌
        await db.query('INSERT INTO ProcessingLog (ViolationID, ErrorCode, ProcessedBy, ProcessedTime, Remarks) VALUES (?, ?, ?, NOW(), ?)', [
            ViolationID,
            '00', // 假設 '00' 代表正常處理
            'System',
            '罰單生成完成'
        ]);

        res.status(200).json({ message: 'Ticket generated successfully', ticketId: insertResult.insertId });
    } catch (error) {
        console.error('Error generating ticket:', error);
        res.status(500).json({ message: 'Error generating ticket', error: error.message });
    }
};

// 更新現有罰單的功能
exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { FineAmount, NotificationStatus } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE TicketInfo SET FineAmount = ?, NotificationStatus = ?, CompletionTime = NOW() WHERE TicketID = ?',
            [FineAmount, NotificationStatus, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '找不到指定的罰單' });
        }
        res.json({ message: '罰單更新成功' });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Error updating ticket', error: error.message });
    }
};

// 刪除罰單的功能
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM TicketInfo WHERE TicketID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '找不到指定的罰單' });
        }
        res.json({ message: '罰單刪除成功' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ message: 'Error deleting ticket', error: error.message });
    }
};