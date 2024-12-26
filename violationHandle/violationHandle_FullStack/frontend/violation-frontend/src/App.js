import React, { useState } from 'react';
import axios from 'axios';
import DataForm from './components/DataForm';
import ResultDisplay from './components/ResultDisplay';
import TicketPage from './components/TicketPage';

let currentID = 1; // 舉發 ID 初始化為 1

const App = () => {
    const [violationID, setViolationID] = useState(`0${currentID}`); // 自動生成舉發 ID
    const [previewImage, setPreviewImage] = useState(null);
    const [comparisonStatus, setComparisonStatus] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [showTicketPage, setShowTicketPage] = useState(false); // 控制是否顯示罰單頁面

    const handleFormSubmit = async (formData) => { // 修改這個函數
        try {
            // 發送請求到後端API
            const response = await axios.post('http://localhost:3001/api/violations', {
                deviceID: formData.deviceID,
                captureTime: formData.captureTime,
                captureLocation: formData.captureLocation,
                // 添加其他需要的字段
            });
            
            // 處理後端返回的數據
            const { id } = response.data;
            
            // 模擬 AI 辨識和車牌驗證結果（這部分可以保留，直到實際的 AI 系統準備就緒）
            const aiResult = {
                licensePlate: 'ABC1234',
            };
            const verificationResult = {
                licensePlate: 'ABC1234',
                vehicleType: '小客車',
                vehicleColor: '黑色',
                vehicleRegisterName: '張三',
            };

            const isMatch = aiResult.licensePlate === verificationResult.licensePlate;

            setComparisonStatus(isMatch ? '數據無誤，結果一致' : '數據不匹配，請重新確認');
            setResultData({ aiResult, verificationResult, violationID: id });

            // 更新舉發 ID
            setViolationID(`0${id}`);
        } catch (error) {
            console.error('Error submitting form:', error);
            // 處理錯誤情況
            setComparisonStatus('提交表單時發生錯誤');
        }
    };

    const handleImageUpload = (file) => {
        setPreviewImage(URL.createObjectURL(file)); // 即時顯示圖片預覽
    };

    const handleNavigateToTicket = () => {
        setShowTicketPage(true); // 顯示罰單頁面
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                boxSizing: 'border-box',
                minHeight: '100vh',
            }}
        >
            {!showTicketPage ? (
                <>
                    <h1 style={{ marginBottom: '20px' }}>違規處理系統</h1>
                    <p>當前舉發 ID：{violationID}</p>
                    <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
                        <DataForm onSubmit={handleFormSubmit} onImageUpload={handleImageUpload} />
                    </div>
                    {previewImage && (
                        <div
                            style={{
                                marginTop: '20px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                width: '100%',
                                maxWidth: '600px',
                                backgroundColor: '#f9f9f9',
                                textAlign: 'center',
                            }}
                        >
                            <h3>圖像預覽：</h3>
                            <img
                                src={previewImage}
                                alt="Uploaded Preview"
                                style={{ width: '200px', height: 'auto' }}
                            />
                        </div>
                    )}
                    {resultData && (
                        <ResultDisplay
                            aiResult={resultData.aiResult}
                            verificationResult={resultData.verificationResult}
                            comparisonStatus={comparisonStatus}
                        />
                    )}
                    {comparisonStatus === '數據無誤，結果一致' && (
                        <button
                            onClick={handleNavigateToTicket}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            前往罰單頁面
                        </button>
                    )}
                </>
            ) : (
                <TicketPage />
            )}
        </div>
    );
};

export default App;
