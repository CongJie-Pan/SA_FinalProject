// 此檔案負責建立和管理與MySQL資料庫的連接池
// 提供資料庫連接的配置參數和連接池管理

const mysql = require('mysql2/promise');

/* 資料庫基本連線資訊 */
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