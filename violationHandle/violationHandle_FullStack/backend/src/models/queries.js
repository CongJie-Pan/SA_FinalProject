const pool = require('../config/database');

// 查詢違規事件數據
exports.getViolations = async () => {
    const [rows] = await pool.query('SELECT * FROM EventBasicInfo');
    return rows;
};

// 查詢罰單數據
exports.getTickets = async () => {
    const [rows] = await pool.query('SELECT * FROM TicketInfo');
    return rows;
};
