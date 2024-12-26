const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all tickets
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Ticket');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Error fetching tickets', error: error.message });
    }
});

// POST a new ticket
router.post('/', async (req, res) => {
    const { violationID, licensePlate, amount } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Ticket (ViolationID, LicensePlate, Amount) VALUES (?, ?, ?)',
            [violationID, licensePlate, amount]
        );
        res.status(201).json({ id: result.insertId, message: 'Ticket added successfully' });
    } catch (error) {
        console.error('Error adding ticket:', error);
        res.status(500).json({ message: 'Error adding ticket', error: error.message });
    }
});

module.exports = router;