/**
 * 處理AI車牌辨識的核心控制器，負責接收圖片並進行車牌辨識分析。
 * 整合AI服務與資料庫操作，對模糊或不清晰的車牌圖片進行特殊處理並提供人工審核建議。
 */

exports.recognizePlate = async (req, res) => {
    // 從請求中獲取違規ID和圖片
    const { ViolationID, ViolationImage } = req.body;
    const db = require('../config/database');
    const { generateContentWithBase64Image } = require('../services/aiService');

    try {
        // 定義AI提示詞，指導AI如何處理不同清晰度的車牌圖片
        const prompt = "請辨識這張圖片中的車牌號碼，輸出的車牌號碼只有英文或數字，沒有'-'符號。之後，多重車牌下輸出最清晰的那一個，為系統初步辨識結果。最後，如果圖片有任何模糊、多重車牌或不確定的情況，請以以下格式回覆：'MANUAL_REVIEW,原因,偵測到的車牌號碼'。若完全清晰無誤才直接回覆車牌號碼。請務必謹慎判斷，寧可多列入人工審核也不要錯誤辨識。";

        // 發送圖片到AI服務進行辨識
        console.log('Sending image to AI for recognition...');
        const result = await generateContentWithBase64Image(prompt, ViolationImage);
        console.log('AI recognition result:', result);

        // 處理AI回傳的結果
        let aiLicensePlate = result.trim();
        let needsManualReview = false;
        let recognitionResult = aiLicensePlate;
        let errorType = null;
        let reason = null;

        // 檢查是否需要人工審核
        // 包含三種情況：明確標記為需要審核、模糊、不清楚
        if (aiLicensePlate.toUpperCase().includes('MANUAL_REVIEW') || 
            aiLicensePlate.includes('模糊') || 
            aiLicensePlate.includes('不清楚')) {
            
            // 解析AI回傳的三個部分：標記、原因、初步辨識結果
            const parts = aiLicensePlate.split(',').map(part => part.trim());
            needsManualReview = true;
            recognitionResult = 'MANUAL_REVIEW';
            reason = parts[1] || '需要人工審核';
            aiLicensePlate = parts[2] || 'NaN'; // 使用 AI 提供的最可能車牌號碼，如果沒有則使用 'NaN'
            errorType = '需要人工審核';
        }

        // 將辨識結果儲存到資料庫
        const [insertResult] = await db.query(
            'INSERT INTO AIRecognition (ViolationID, AILicensePlate, RecognitionResult, ErrorType) VALUES (?, ?, ?, ?)',
            [ViolationID, aiLicensePlate, recognitionResult, errorType]
        );
        console.log('Inserted into database with ID:', insertResult.insertId);

        // 回傳處理結果
        res.status(200).json({
            success: true,
            aiLicensePlate,
            needsManualReview,
            recognitionResult,
            reason,
            insertId: insertResult.insertId
        });
    } catch (error) {
        // 錯誤處理
        console.error('Error in recognizePlate:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};