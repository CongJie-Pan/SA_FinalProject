import axios from 'axios';

const API = axios.create({
    baseURL: '/api', // 使用相對路徑，前後端同埠時有效
});

// 新增違規數據 API
export const addViolation = (data) => API.post('/violation/add', data);

// 更新人工辨識結果 API
export const updateManualReview = (data) => API.post('/manual/update', data);

// 生成罰單 API
export const generateTicket = (data) => API.post('/ticket/generate', data);

// AI 辨識車牌 API
export const recognizePlate = (data) => API.post('/ai/recognize', data);

export default API;
