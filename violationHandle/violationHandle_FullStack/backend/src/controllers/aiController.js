exports.recognizePlate = async (req, res) => {
    const { ViolationID, ViolationImage } = req.body;
    const db = require('../config/database');
    const { generateContentWithBase64Image } = require('../services/aiService');

    try {
        const prompt = "請辨識這張圖片中的車牌號碼。如果車牌模糊或有偵測到1個以上的車牌，請回覆 'MANUAL_REVIEW' 即可。否則，只需回覆車牌號碼。";

        console.log('Sending image to AI for recognition...');
        const result = await generateContentWithBase64Image(prompt, ViolationImage);
        console.log('AI recognition result:', result);

        let aiLicensePlate = result.trim();
        let needsManualReview = false;
        let recognitionResult = aiLicensePlate;
        let errorType = null;

        if (aiLicensePlate.toUpperCase().includes('MANUAL_REVIEW')) {
            needsManualReview = true;
            recognitionResult = 'MANUAL_REVIEW';
            aiLicensePlate = 'NaN';
            errorType = '需要人工審核';
        }

        // 儲存辨識結果至資料庫
        const [insertResult] = await db.query(
            'INSERT INTO AIRecognition (ViolationID, AILicensePlate, RecognitionResult, ErrorType) VALUES (?, ?, ?, ?)',
            [ViolationID, aiLicensePlate, recognitionResult, errorType]
        );
        console.log('Inserted into database with ID:', insertResult.insertId);

        res.status(200).json({
            success: true,
            aiLicensePlate,
            needsManualReview,
            recognitionResult,
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