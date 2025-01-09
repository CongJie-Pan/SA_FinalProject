const db = require('../config/database');

exports.getVehicleInfoByViolationId = async (req, res) => {
    const { violationId } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM VehicleInfo WHERE ViolationID = ?', [violationId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: '找不到指定的車輛資訊' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching vehicle info:', error);
        res.status(500).json({ message: 'Error fetching vehicle info', error: error.message });
    }
};
