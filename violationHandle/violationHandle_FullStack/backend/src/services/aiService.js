// 此檔案負責與Google AI API進行整合，提供AI影像辨識的核心服務
// 主要處理Base64格式圖片的AI分析請求，並返回辨識結果

const { GoogleGenerativeAI } = require("@google/generative-ai");

// 初始化Google AI服務，使用環境變數中的API密鑰
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// 選擇並初始化特定的AI模型版本
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// 處理Base64格式圖片的AI內容生成函數
async function generateContentWithBase64Image(prompt, base64Image) {
    try {
        // 清理Base64字串，移除metadata前綴
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

        // 準備發送給AI的數據結構
        const parts = [
            { text: prompt },
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Data
                }
            }
        ];

        // 調用AI模型進行內容生成
        const result = await model.generateContent({
            contents: [{ role: 'user', parts }],
        });

        return result.response.text();
    } catch (error) {
        console.error('Error in generateContentWithBase64Image:', error);
        throw error;
    }
}

module.exports = {
    model,
    generateContentWithBase64Image
};