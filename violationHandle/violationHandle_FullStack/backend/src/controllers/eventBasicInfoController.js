const db = require('../config/database');

exports.getEventBasicInfoByViolationId = async (req, res) => {
    const { violationId } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM EventBasicInfo WHERE ViolationID = ?', [violationId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: '找不到指定的事件基本資訊' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching event basic info:', error);
        res.status(500).json({ message: 'Error fetching event basic info', error: error.message });
    }
};
