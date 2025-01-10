/**
 * ticketController: 處理罰單相關操作的控制器。
 * 主要功能：1. 創建、更新、獲取和刪除罰單信息。 2. 同步違規事件資訊到罰單中。
 */

const db = require('../config/database');
const logger = require('../utils/logger'); // 假設您有一個日誌工具

// 創建新的罰單
exports.createTicket = async (req, res) => {
    logger.info('開始創建新的罰單');
    const { ViolationID, FineAmount, NotificationStatus } = req.body;

    try {
        // 開始資料庫事務
        await db.beginTransaction();

        // 從 EventBasicInfo 獲取 CaptureTime 和 CaptureLocation
        const [eventInfo] = await db.query(
            'SELECT CaptureTime, CaptureLocation FROM EventBasicInfo WHERE ViolationID = ?',
            [ViolationID]
        );

        if (eventInfo.length === 0) {
            throw new Error('找不到對應的違規事件');
        }

        const { CaptureTime, CaptureLocation } = eventInfo[0];

        // 插入 TicketInfo，包括從 EventBasicInfo 獲取的資訊
        const [result] = await db.query(
            'INSERT INTO TicketInfo (ViolationID, FineAmount, NotificationStatus, CaptureTime, CaptureLocation) VALUES (?, ?, ?, ?, ?)',
            [ViolationID, FineAmount, NotificationStatus, CaptureTime, CaptureLocation]
        );

        // 提交事務
        await db.commit();

        logger.info(`罰單創建成功，TicketID: ${result.insertId}`);
        res.status(201).json({
            message: '罰單創建成功',
            TicketID: result.insertId
        });
    } catch (error) {
        // 如果出錯，回滾事務
        await db.rollback();
        logger.error('創建罰單失敗', error);
        res.status(500).json({ message: '創建罰單失敗', error: error.message });
    }
};

// 更新罰單
exports.updateTicket = async (req, res) => {
    logger.info('開始更新罰單');
    const { TicketID } = req.params;
    const { FineAmount, NotificationStatus } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE TicketInfo SET FineAmount = ?, NotificationStatus = ? WHERE TicketID = ?',
            [FineAmount, NotificationStatus, TicketID]
        );

        if (result.affectedRows === 0) {
            logger.warn(`未找到 TicketID 為 ${TicketID} 的罰單`);
            return res.status(404).json({ message: '未找到該罰單' });
        }

        logger.info(`罰單更新成功，TicketID: ${TicketID}`);
        res.status(200).json({ message: '罰單更新成功', TicketID });
    } catch (error) {
        logger.error('更新罰單失敗', error);
        res.status(500).json({ message: '更新罰單失敗', error: error.message });
    }
};

// 獲取單個罰單詳情
exports.getTicket = async (req, res) => {
    logger.info('開始獲取罰單詳情');
    const { TicketID } = req.params;

    try {
        const [rows] = await db.query(
            `SELECT t.*, e.VehicleID, e.ViolationType
             FROM TicketInfo t
                      JOIN EventBasicInfo e ON t.ViolationID = e.ViolationID
             WHERE t.TicketID = ?`,
            [TicketID]
        );

        if (rows.length === 0) {
            logger.warn(`未找到 TicketID 為 ${TicketID} 的罰單`);
            return res.status(404).json({ message: '未找到該罰單' });
        }

        logger.info(`成功獲取 TicketID 為 ${TicketID} 的罰單詳情`);
        res.status(200).json(rows[0]);
    } catch (error) {
        logger.error('獲取罰單詳情失敗', error);
        res.status(500).json({ message: '獲取罰單詳情失敗', error: error.message });
    }
};

// 獲取所有罰單列表
exports.getAllTickets = async (req, res) => {
    logger.info('開始獲取所有罰單列表');

    try {
        const [rows] = await db.query(
            `SELECT t.TicketID, t.ViolationID, t.FineAmount, t.NotificationStatus,
                    t.CaptureTime, t.CaptureLocation, e.VehicleID, e.ViolationType
             FROM TicketInfo t
                      JOIN EventBasicInfo e ON t.ViolationID = e.ViolationID
             ORDER BY t.CaptureTime DESC`
        );

        logger.info(`成功獲取 ${rows.length} 條罰單記錄`);
        res.status(200).json(rows);
    } catch (error) {
        logger.error('獲取罰單列表失敗', error);
        res.status(500).json({ message: '獲取罰單列表失敗', error: error.message });
    }
};

// 刪除罰單
exports.deleteTicket = async (req, res) => {
    logger.info('開始刪除罰單');
    const { TicketID } = req.params;

    try {
        const [result] = await db.query('DELETE FROM TicketInfo WHERE TicketID = ?', [TicketID]);

        if (result.affectedRows === 0) {
            logger.warn(`未找到 TicketID 為 ${TicketID} 的罰單`);
            return res.status(404).json({ message: '未找到該罰單' });
        }

        logger.info(`成功刪除 TicketID 為 ${TicketID} 的罰單`);
        res.status(200).json({ message: '罰單刪除成功', TicketID });
    } catch (error) {
        logger.error('刪除罰單失敗', error);
        res.status(500).json({ message: '刪除罰單失敗', error: error.message });
    }
};