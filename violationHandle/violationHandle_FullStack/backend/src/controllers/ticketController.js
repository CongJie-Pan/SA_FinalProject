const db = require('../config/database');

// Get all tickets
exports.getAllTickets = async (req, res) => {
    try {
        const [tickets] = await db.query('SELECT * FROM TicketInfo');
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
};

// Get a specific ticket by ID
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

// Generate a new ticket
exports.generateTicket = async (req, res) => {
    const { ViolationID, FineAmount } = req.body;
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // 1. 檢查是否已存在罰單
        const [existingTicket] = await connection.query(
            'SELECT * FROM TicketInfo WHERE ViolationID = ?',
            [ViolationID]
        );

        if (existingTicket.length > 0) {
            throw new Error('此違規已存在罰單');
        }

        // 2. 生成罰單
        const ticketID = `T${Date.now()}`;
        await connection.query(
            'INSERT INTO TicketInfo (TicketID, ViolationID, FineAmount, IssuedDate, Status) VALUES (?, ?, ?, NOW(), ?)',
            [ticketID, ViolationID, FineAmount, '已開立']
        );

        // 3. 獲取 AIRecognition 的 ErrorType
        const [aiRecognition] = await connection.query(
            'SELECT ErrorType FROM AIRecognition WHERE ViolationID = ?',
            [ViolationID]
        );

        // 4. 記錄處理日誌
        const [lastLog] = await connection.query('SELECT MAX(LogID) as maxLogID FROM ProcessingLog');
        const newLogID = (lastLog[0].maxLogID || 0) + 1;
        
        await connection.query(
            'INSERT INTO ProcessingLog (LogID, ViolationID, ErrorCode, ProcessedBy, ProcessedTime, Remarks) VALUES (?, ?, ?, ?, NOW(), ?)',
            [newLogID, ViolationID, '02', 'System', '罰單生成完成']
        );

        await connection.commit();

        // 5. 返回完整罰單資訊
        const [ticketInfo] = await connection.query(
            'SELECT * FROM TicketInfo WHERE TicketID = ?',
            [ticketID]
        );

        res.status(200).json(ticketInfo[0]);

    } catch (error) {
        await connection.rollback();
        console.error('Error generating ticket:', error);
        res.status(500).json({
            message: 'Error generating ticket',
            error: error.message
        });
    } finally {
        connection.release();
    }
};

// Update an existing ticket
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

// Delete a ticket
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