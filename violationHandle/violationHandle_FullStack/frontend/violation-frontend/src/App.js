import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataForm from './components/DataForm';
import DatabaseContent from './components/DatabaseContent';
import TicketPage from './components/TicketPage';
import ResultDisplay from './components/ResultDisplay';

let currentID = 1;

const App = () => {
    const [violationID, setViolationID] = useState(`0${currentID}`);
    const [previewImage, setPreviewImage] = useState(null);
    const [comparisonStatus, setComparisonStatus] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [showTicketPage, setShowTicketPage] = useState(false);
    const [violations, setViolations] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDatabaseContent, setShowDatabaseContent] = useState(false);
    const [processStatus, setProcessStatus] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [violationsResponse, ticketsResponse] = await Promise.all([
                    axios.get('http://localhost:3001/api/violations'),
                    axios.get('http://localhost:3001/api/tickets')
                ]);
                setViolations(violationsResponse.data);
                setTickets(ticketsResponse.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.response?.status ? `服務器錯誤: ${error.response.status}` : '無法連接到服務器');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            setProcessStatus('開始處理違規資料...');

            // 使用接收到的 formData
            const violationResponse = await axios.post('http://localhost:3001/api/violations', formData);

            const { id } = violationResponse.data;
            setViolationID(`0${id}`);
            setProcessStatus('違規資料已上傳，ID: ' + `0${id}`);

            // 進行 AI 辨識
            setProcessStatus('正在進行 AI 辨識...');
            const aiResponse = await axios.post('http://localhost:3001/api/ai/recognize-plate', {
                ViolationID: id,
                ViolationImage: previewImage,
            });

            console.log('AI Response:', aiResponse.data);  // 添加這行來查看 AI 響應

            const aiResult = aiResponse.data;
            setProcessStatus('AI 辨識完成');

            // 更新這部分以使用正確的屬性名
            const recognizedPlate = aiResult.aiLicensePlate;

            // 模擬車牌驗證結果（實際應用中應該從後端獲取）
            setProcessStatus('正在驗證車牌資訊...');
            const verificationResult = {
                licensePlate: recognizedPlate,  // 使用 AI 辨識的結果
                vehicleType: '小客車',
                vehicleColor: '黑色',
                vehicleRegisterName: '張三',
            };

            const isMatch = recognizedPlate === verificationResult.licensePlate;

            setComparisonStatus(isMatch ? '數據無誤，結果一致' : '數據不匹配，請重新確認');
            setResultData({
                aiResult: { licensePlate: recognizedPlate },  // 更新這裡
                verificationResult,
            });

            setViolations(prevViolations => [...prevViolations, violationResponse.data]);
            setProcessStatus('處理完成');
        } catch (error) {
            console.error('Error submitting form:', error);
            console.error('Form data:', formData);

            if (error.message.includes('表單數據為空') || error.message.includes('表單數據不完整')) {
                setProcessStatus(`處理錯誤: ${error.message}`);
            } else if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                setProcessStatus(`處理錯誤: ${error.response.status} - ${error.response.data.message || '未知錯誤'}`);
            } else if (error.request) {
                console.error('No response received');
                setProcessStatus('處理錯誤: 無法連接到服務器');
            } else {
                console.error('Error message:', error.message);
                setProcessStatus(`處理錯誤: ${error.message}`);
            }
            setComparisonStatus('提交表單時發生錯誤');
        }
    };

    const handleImageUpload = (file) => {
        setProcessStatus('正在上傳圖片...');
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
            setProcessStatus('圖片上傳完成');
        };
        reader.readAsDataURL(file);
    };

    const handleNavigateToTicket = () => {
        setShowTicketPage(true);
    };

    const toggleDatabaseContent = () => {
        setShowDatabaseContent(!showDatabaseContent);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            minHeight: '100vh',
        }}>
            <h1 style={{ marginBottom: '20px' }}>違規處理系統</h1>
            <button onClick={toggleDatabaseContent} style={{ marginBottom: '20px' }}>
                {showDatabaseContent ? '返回主頁' : '預覽資料庫內容'}
            </button>

            {showDatabaseContent ? (
                <DatabaseContent violations={violations} tickets={tickets} loading={loading} error={error} />
            ) : (
                <>
                    <p>當前舉發 ID：{violationID}</p>

                    <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
                        <DataForm onSubmit={handleFormSubmit} onImageUpload={handleImageUpload} />
                    </div>

                    {previewImage && (
                        <div style={{
                            marginTop: '20px',
                            textAlign: 'center',
                        }}>
                            <h3>上傳圖片預覽</h3>
                            <img
                                src={previewImage}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: '300px' }}
                            />
                        </div>
                    )}

                    {processStatus && (
                        <div style={{
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '5px',
                            textAlign: 'center'
                        }}>
                            <p>{processStatus}</p>
                        </div>
                    )}

                    {resultData && (
                        <ResultDisplay
                            aiResult={resultData.aiResult}
                            verificationResult={resultData.verificationResult}
                            comparisonStatus={comparisonStatus}
                        />
                    )}

                    {comparisonStatus && (
                        <button onClick={handleNavigateToTicket} style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}>
                            生成罰單
                        </button>
                    )}

                    {showTicketPage && <TicketPage />}
                </>
            )}
        </div>
    );
}

export default App;