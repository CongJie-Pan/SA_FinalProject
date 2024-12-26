/*
const path = require('path');
const express = require('express');
const app = require('./app'); // 後端應用實例

const PORT = process.env.PORT || 3000;

// 提供靜態資源
app.use(express.static(path.join(__dirname, '../../frontend/violation-frontend/build')));

// 處理未匹配的路由，返回前端的 index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/violation-frontend/build', 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/

const path = require('path');
const express = require('express');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    // 僅在生產模式提供靜態資源
    app.use(express.static(path.join(__dirname, '../../frontend/violation-frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/violation-frontend/build', 'index.html'));
    });
} else {
    // 開發模式：重定向到 React 開發伺服器
    app.get('*', (req, res) => {
        res.redirect('http://localhost:3001' + req.originalUrl);
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


