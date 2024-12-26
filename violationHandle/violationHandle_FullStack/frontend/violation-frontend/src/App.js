import React, { useState, useEffect } from 'react';
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
    const [violations, setViolations] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                if (error.response) {
                    // 請求已發出，但服務器回應狀態碼不在 2xx 範圍內
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    setError(`服務器錯誤: ${error.response.status}`);
                } else if (error.request) {
                    // 請求已發出，但沒有收到回應
                    console.error('No response received');
                    setError('無法連接到服務器');
                } else {
                    // 在設置請求時發生了一些錯誤
                    console.error('Error message:', error.message);
                    setError(`請求錯誤: ${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        const fetchViolations = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/violations');
                setViolations(response.data);
            } catch (error) {
                console.error('Error fetching violations:', error);
                setError('無法載入違規事件數據');
            }
        };

        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/tickets');
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setError('無法載入罰單數據');
            }
        };

        fetchData();
        fetchViolations();
        fetchTickets();
    }, []);



    const handleFormSubmit = async (formData) => {
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

            // 更新違規事件列表
            setViolations(prevViolations => [...prevViolations, response.data]);
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

    const renderViolationsList = () => (
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
            <h2>違規事件列表</h2>
            {loading ? (
                <p>載入中...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : violations.length === 0 ? (
                <p>目前沒有違規事件。</p>
            ) : (
                <ul>
                    {violations.map(violation => (
                        <li key={violation.id}>
                            ID: {violation.id}, 地點: {violation.captureLocation}, 時間: {violation.captureTime}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    const renderTicketsList = () => (
        <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
            <h2>罰單列表</h2>
            {loading ? (
                <p>載入中...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : tickets.length === 0 ? (
                <p>目前沒有罰單。</p>
            ) : (
                <ul>
                    {tickets.map(ticket => (
                        <li key={ticket.id}>
                            罰單號: {ticket.id}, 車牌: {ticket.licensePlate}, 金額: {ticket.amount}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

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
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }}
                        />
                    )}
                    {comparisonStatus && (
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <p>{comparisonStatus}</p>
                            {resultData && <ResultDisplay data={resultData} />}
                            <button onClick={handleNavigateToTicket}>生成罰單</button>
                        </div>
                    )}
                    {renderViolationsList()}
                    {renderTicketsList()}
                </>
            ) : (
                <TicketPage />
            )}
        </div>
    );
};

export default App;