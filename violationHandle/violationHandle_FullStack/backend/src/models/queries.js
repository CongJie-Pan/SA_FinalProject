// src/models/queries.js

const db = require('./db');

// 查詢違規事件數據
exports.getViolations = async () => {
    const [rows] = await db.query('SELECT * FROM EventBasicInfo');
    return rows;
};

// 查詢罰單數據
exports.getTickets = async () => {
    const [rows] = await db.query('SELECT * FROM TicketInfo');
    return rows;
};
