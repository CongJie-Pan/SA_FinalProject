/**
 * 提供罰單相關的後端處理功能，包括罰單的生成、查詢、更新和刪除
 * 負責處理與罰單資料庫的所有互動操作，確保罰單資料的正確儲存和管理
 */

const db = require('../config/database');

// 獲取所有罰單資料的功能
exports.getAllTickets = async (req, res) => {
    try {
        const [tickets] = await db.query('SELECT * FROM TicketInfo');
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
};

// 根據ID獲取特定罰單的功能
exports.getTicketById = async (req, res) => {
    const { id } = req.params;
    try {
        const [ticket] = await db.query('SELECT * FROM TicketInfo WHERE TicketID = ?', [id]);
        if (ticket.length > 0) {
            res.status(200).json(ticket[0]);
        } else {
            res.status(404).json({ message: 'Ticket not found' });
        }
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ message: 'Error fetching ticket', error: error.message });
    }
};

// 生成新罰單的功能
exports.generateTicket = async (req, res) => {
    // 從請求中獲取違規ID和罰款金額
    const { ViolationID, FineAmount } = req.body;

    try {
        // 使用時間戳記產生獨特的罰單ID
        const ticketID = `T${Date.now()}`;
        
        // 步驟1: 在罰單資料表中新增記錄
        console.log('Inserting into TicketInfo...');
        await db.query('INSERT INTO TicketInfo (TicketID, ViolationID, FineAmount, IssuedDate) VALUES (?, ?, ?, NOW())',
            [ticketID, ViolationID, FineAmount]);
        console.log('TicketInfo inserted successfully');

        // 步驟2: 獲取AI辨識的錯誤類型，用於記錄處理日誌
        console.log('Fetching AIRecognition...');
        const [aiRecognition] = await db.query('SELECT ErrorType FROM AIRecognition WHERE ViolationID = ?', [ViolationID]);
        const errorType = aiRecognition[0]?.ErrorType || 'Unknown';
        console.log('AIRecognition fetched, ErrorType:', errorType);

        // 步驟3: 在處理日誌中記錄罰單生成的操作
        console.log('Inserting into ProcessingLog...');
        const [lastLog] = await db.query('SELECT MAX(LogID) as maxLogID FROM ProcessingLog');
        const newLogID = (lastLog[0].maxLogID || 0) + 1;

        await db.query('INSERT INTO ProcessingLog (LogID, ViolationID, ErrorCode, ProcessedBy, ProcessedTime, Remarks) VALUES (?, ?, ?, ?, NOW(), ?)',
            [newLogID, ViolationID, '01', 'Worker', errorType]);
        console.log('ProcessingLog inserted successfully');

        // 步驟4: 回傳新生成的罰單資訊
        console.log('Fetching generated ticket info...');
        const [ticketInfo] = await db.query('SELECT * FROM TicketInfo WHERE TicketID = ?', [ticketID]);

        console.log('Ticket generated successfully:', ticketInfo[0]);
        res.status(200).json(ticketInfo[0]);
    } catch (error) {
        // 錯誤處理和記錄
        console.error('Error generating ticket:', error);
        res.status(500).json({ message: 'Error generating ticket', error: error.message, stack: error.stack });
    }
};

// 更新現有罰單的功能
exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { FineAmount } = req.body;
    try {
        await db.query('UPDATE TicketInfo SET FineAmount = ? WHERE TicketID = ?', [FineAmount, id]);
        res.status(200).json({ message: 'Ticket updated successfully' });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Error updating ticket', error: error.message });
    }
};

// 刪除罰單的功能
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM TicketInfo WHERE TicketID = ?', [id]);
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ message: 'Error deleting ticket', error: error.message });
    }
};