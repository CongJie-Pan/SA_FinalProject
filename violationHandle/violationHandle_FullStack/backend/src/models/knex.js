// src/models/knex.js

// 引入 Knex.js
const knex = require('knex');

// 配置 Knex.js 連接參數
const knexInstance = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'violation_system',
    },
});

// 導出 Knex.js 實例
module.exports = knexInstance;
