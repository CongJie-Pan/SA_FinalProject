import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataForm from './components/DataForm';
import ResultDisplay from './components/ResultDisplay';
import TicketPage from './components/TicketPage';
import DatabaseContent from './components/DatabaseContent';

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
    const [showDatabaseContent, setShowDatabaseContent] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [violationsResponse, ticketsResponse] = await Promise.all([
                    axios.get('http://localhost:3001/api/violations'),
                    axios.get('http://localhost:3001/api/tickets')
                ]);
                console.log('Violations data:', violationsResponse.data);
                console.log('Tickets data:', ticketsResponse.data);
                setViolations(violationsResponse.data);
                setTickets(ticketsResponse.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    setError(`服務器錯誤: ${error.response.status}`);
                } else if (error.request) {
                    console.error('No response received');
                    setError('無法連接到服務器');
                } else {
                    console.error('Error message:', error.message);
                    setError(`請求錯誤: ${error.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3001/api/violations', {
                deviceID: formData.deviceID,
                captureTime: formData.captureTime,
                captureLocation: formData.captureLocation,
            });

            const { id } = response.data;

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

            setViolationID(`0${id}`);
            setViolations(prevViolations => [...prevViolations, response.data]);
        } catch (error) {
            console.error('Error submitting form:', error);
            setComparisonStatus('提交表單時發生錯誤');
        }
    };

    const handleImageUpload = (file) => {
        setPreviewImage(URL.createObjectURL(file));
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
            <button onClick={toggleDatabaseContent}>
                {showDatabaseContent ? '返回主頁' : '查看數據庫內容'}
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

                    {showTicketPage && <TicketPage />}
                </>
            )}
        </div>
    );
};

export default App;