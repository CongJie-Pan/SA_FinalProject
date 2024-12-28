const { GoogleGenerativeAI } = require("@google/generative-ai");

// 確保你已經設置了 API 密鑰
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// 初始化模型
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

async function generateContentWithBase64Image(prompt, base64Image) {
    try {
        // 移除 Base64 字符串開頭的 "data:image/jpeg;base64," 部分（如果存在）
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

        const parts = [
            { text: prompt },
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Data
                }
            }
        ];

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