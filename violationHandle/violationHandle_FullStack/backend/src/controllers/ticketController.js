// src/controllers/ticketController.js

const db = require('../models/db');

// 生成罰單
exports.generateTicket = async (req, res) => {
    const { ViolationID, FineAmount } = req.body;

    try {
        // 插入罰單資料
        const [result] = await db.query('INSERT INTO TicketInfo (ViolationID, FineAmount, IssuedDate) VALUES (?, ?, NOW())', [
            ViolationID,
            FineAmount,
        ]);

        res.status(200).json({ message: 'Ticket generated successfully', TicketID: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error generating ticket', error });
    }
};
