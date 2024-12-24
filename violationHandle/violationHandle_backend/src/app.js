const express = require('express');
const bodyParser = require('body-parser');
const violationRoutes = require('./routes/violations'); // 引用路由

const app = express();

app.use(bodyParser.json()); // 處理 JSON 請求

// 根路由
app.get('/', (req, res) => {
    res.send('Welcome to the Violation Processing System!');
});

// 違規路由
app.use('/api/violations', violationRoutes);

module.exports = app;
