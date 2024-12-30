// 此檔案是Express應用程序的核心配置文件，負責整合所有中間件和路由
// 處理所有API路由的註冊和靜態資源的配置

const db = require('./config/database');

// 在應用啟動時測試資料庫連接
db.query('SELECT 1')
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);  // 如果無法連接到資料庫，終止應用
    });

/* Express應用程序配置區域 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 引入各個功能模塊的路由處理器
const path = require('path');
const manualRoutes = require('./routes/manualRoutes');    // 人工審核路由
const ticketRoutes = require('./routes/ticketRoutes');    // 罰單處理路由
const violationRoutes = require('./routes/violationRoutes'); // 違規處理路由
const aiRoutes = require('./routes/aiRoutes');           // AI辨識路由
const vehicleInfoRoutes = require('./api/vehicleInfo');   // 車輛信息路由

const app = express();

// 中間件配置
app.use(bodyParser.json());    // 解析JSON格式的請求體
app.use(cors());              // 處理跨域請求

// API路由註冊
app.use('/api/violations', violationRoutes);     // 違規相關API
app.use('/api/tickets', ticketRoutes);           // 罰單相關API
app.use('/api/ai', aiRoutes);                    // AI辨識相關API
app.use('/api/vehicleInfo', vehicleInfoRoutes);  // 車輛信息相關API

// 靜態資源配置
app.use(express.static(path.join(__dirname, '../../frontend/violation-frontend/build')));

// 根路由
app.get('/', (req, res) => {
    res.send('Welcome to the Violation Processing System!');
});

// 路由綁定
app.use('/api/manual', manualRoutes);
app.use('/api/ticket', ticketRoutes);
app.use('/api/violation', violationRoutes);
app.use('/api/ai', aiRoutes);

// 捕捉前端路由，返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/violation-frontend/build', 'index.html'));
});

module.exports = app;