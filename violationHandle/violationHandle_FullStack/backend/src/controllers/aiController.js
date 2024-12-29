exports.recognizePlate = async (req, res) => {
    const { ViolationID, ViolationImage } = req.body;
    const db = require('../config/database');
    const { generateContentWithBase64Image } = require('../services/aiService');

    try {
        const prompt = "請辨識這張圖片中的車牌號碼。如果圖片有任何模糊、多重車牌或不確定的情況，請以以下格式回覆：'MANUAL_REVIEW,原因,偵測到的車牌號碼'。若完全清晰無誤才直接回覆車牌號碼。請務必謹慎判斷，寧可多列入人工審核也不要錯誤辨識。";

        console.log('Sending image to AI for recognition...');
        const result = await generateContentWithBase64Image(prompt, ViolationImage);
        console.log('AI recognition result:', result);

        let aiLicensePlate = result.trim();
        let needsManualReview = false;
        let recognitionResult = aiLicensePlate;
        let errorType = null;
        let reason = null;

        // 檢查是否包含 MANUAL_REVIEW 或其他可能需要人工審核的情況
        if (aiLicensePlate.toUpperCase().includes('MANUAL_REVIEW') || 
            aiLicensePlate.includes('模糊') || 
            aiLicensePlate.includes('不清楚')) {
            
            const parts = aiLicensePlate.split(',').map(part => part.trim());
            needsManualReview = true;
            recognitionResult = 'MANUAL_REVIEW';
            reason = parts[1] || '需要人工審核';
            aiLicensePlate = parts[2] || '無法完全辨識';
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
            reason,
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