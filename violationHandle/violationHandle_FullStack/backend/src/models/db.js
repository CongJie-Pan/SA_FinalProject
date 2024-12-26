// src/models/db.js

// 引入 MySQL2 模組
const mysql = require('mysql2');

// 建立資料庫連接池
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'sa_final_pj',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// 導出連接池
module.exports = pool.promise();
