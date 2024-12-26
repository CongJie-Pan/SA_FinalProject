const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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