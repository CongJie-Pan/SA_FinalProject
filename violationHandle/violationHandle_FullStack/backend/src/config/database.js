const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sa_final_pj', // 此處需要是小寫
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;