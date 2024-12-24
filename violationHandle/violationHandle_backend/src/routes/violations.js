const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// 儲存違規事件
router.post('/', async (req, res) => {
    const { deviceID, captureTime, captureLocation } = req.body;
    try {
        const [id] = await knex('EventBasicInfo').insert({
            DeviceID: deviceID,
            CaptureTime: captureTime,
            CaptureLocation: captureLocation,
        });
        res.status(201).send({ message: 'Violation saved', id });
    } catch (err) {
        res.status(500).send({ error: 'Database Error', details: err });
    }
});

// 查詢違規事件
router.get('/:id', async (req, res) => {
    try {
        const event = await knex('EventBasicInfo').where('ViolationID', req.params.id).first();
        if (event) {
            res.status(200).send(event);
        } else {
            res.status(404).send({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Database Error', details: err });
    }
});

module.exports = router;
