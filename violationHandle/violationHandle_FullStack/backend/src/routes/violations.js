const express = require('express');
const router = express.Router();
const knex = require('../models/knex');

// 儲存違規事件
router.post('/', async (req, res) => {
    const { deviceID, captureTime, captureLocation } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO EventBasicInfo (DeviceID, CaptureTime, CaptureLocation) VALUES (?, ?, ?)',
            [deviceID, captureTime, captureLocation]
        );
        res.status(201).json({ message: 'Violation saved', id: result.insertId });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ error: 'Database Error', details: err.message });
    }
});

// 查詢違規事件
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM EventBasicInfo WHERE ViolationID = ?', [req.params.id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ error: 'Database Error', details: err.message });
    }
});

module.exports = router;
