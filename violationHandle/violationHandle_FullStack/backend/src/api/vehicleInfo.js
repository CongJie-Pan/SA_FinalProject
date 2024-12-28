const express = require('express');
const router = express.Router();
const db = require('../config/database');  // 確保這個路徑是正確的

router.get('/:licensePlate', async (req, res) => {
    const { licensePlate } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM vehicleinfo WHERE LicensePlate = ?', [licensePlate]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: '未找到該車輛資訊' });
        }
    } catch (error) {
        console.error('Error fetching vehicle info:', error);
        res.status(500).json({ message: '服務器錯誤' });
    }
});

module.exports = router;