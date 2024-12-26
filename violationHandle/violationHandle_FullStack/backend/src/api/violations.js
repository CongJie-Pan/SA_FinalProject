const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all violations
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM EventBasicInfo');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching violations:', error);
        res.status(500).json({ message: 'Error fetching violations', error: error.message });
    }
});

// POST a new violation
router.post('/', async (req, res) => {
    const { deviceID, captureTime, captureLocation } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO EventBasicInfo (DeviceID, CaptureTime, CaptureLocation) VALUES (?, ?, ?)',
            [deviceID, captureTime, captureLocation]
        );
        res.status(201).json({ id: result.insertId, message: 'Violation added successfully' });
    } catch (error) {
        console.error('Error adding violation:', error);
        res.status(500).json({ message: 'Error adding violation', error: error.message });
    }
});

module.exports = router;