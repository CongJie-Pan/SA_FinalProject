const db = require('../config/database');

exports.getAiRecognitionByViolationId = async (req, res) => {
    const { violationId } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM AIRecognition WHERE ViolationID = ?', [violationId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: '找不到指定的AI辨識資訊' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching AI recognition info:', error);
        res.status(500).json({ message: 'Error fetching AI recognition info', error: error.message });
    }
};
