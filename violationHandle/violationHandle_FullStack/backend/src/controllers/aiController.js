const db = require('../config/database');
const { generateContentWithBase64Image } = require('../services/aiService');

exports.recognizePlate = async (req, res) => {
    const { ViolationID, ViolationImage } = req.body;

    try {
        const prompt = "請辨識這張圖片中的車牌號碼，只需要回覆車牌號碼，不需要其他說明。";

        console.log('Sending image to AI for recognition...');
        const result = await generateContentWithBase64Image(prompt, ViolationImage);
        console.log('AI recognition result:', result);

        const aiLicensePlate = result.trim();
        console.log('Extracted license plate:', aiLicensePlate);

        // 儲存辨識結果至資料庫
        const [insertResult] = await db.query(
            'INSERT INTO AIRecognition (ViolationID, AILicensePlate) VALUES (?, ?)',
            [ViolationID, aiLicensePlate, '成功']
        );
        console.log('Inserted into database with ID:', insertResult.insertId);

        res.status(200).json({
            success: true,
            aiLicensePlate,
            insertId: insertResult.insertId
        });
    } catch (error) {
        console.error('Error in recognizePlate:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};