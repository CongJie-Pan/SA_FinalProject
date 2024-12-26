// src/app.js

/* API 連接部分 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

// 引入路由
const manualRoutes = require('./routes/manualRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const violationRoutes = require('./routes/violationRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// 使用中介軟體
app.use(bodyParser.json());
app.use(cors());

// 使用路由
app.use('/api/violations', violationRoutes);
app.use('/api/tickets', ticketRoutes);

// 靜態資源配置
// 指定靜態文件目錄，指向 React 的 build 資料夾
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