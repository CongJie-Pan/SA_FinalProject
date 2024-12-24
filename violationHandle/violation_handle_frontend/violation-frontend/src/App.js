import React, { useState } from 'react';
import DataForm from './components/DataForm';
import TestSelector from './components/TestSelector';
import ResultDisplay from './components/ResultDisplay';
import axios from 'axios';

function App() {
    const [selectedTest, setSelectedTest] = useState('');
    const [testResult, setTestResult] = useState(null);

    const testDescriptions = {
        '1': '確認系統是否能正確接收來自智慧燈桿的數據，並記錄在資料庫中。',
        '2': '測試系統能否判斷車輛是否超速，並記錄違規類型。',
        '3': '確認原始數據（如時速和時間）能正確格式化，以供其他子系統使用。',
        '4': '測試數據能否正確存儲到資料庫，並保持數據完整性。',
        '5': '測試數據是否能正確分流到車牌驗證或 AI 辨識子系統。',
    };

    const handleTestSelect = (testId) => {
        setSelectedTest(testId);
        setTestResult(null); // 清空之前的測試結果
    };

    const handleFormSubmit = async (formData) => {
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) {
                    formDataToSend.append(key, value);
                }
            });

            let url = '';
            switch (selectedTest) {
                case '1':
                    url = 'http://localhost:3000/api/violations';
                    break;
                case '2':
                    url = 'http://localhost:3000/api/violations/check';
                    break;
                case '3':
                    url = 'http://localhost:3000/api/violations/format';
                    break;
                case '4':
                    url = 'http://localhost:3000/api/violations/save';
                    break;
                case '5':
                    url = 'http://localhost:3000/api/violations/route';
                    break;
                default:
                    setTestResult({ error: '未選擇有效的測試案例' });
                    return;
            }

            const response = await axios.post(url, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setTestResult(response.data);
        } catch (error) {
            setTestResult({ error: error.message });
        }
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
            <h1 style={{ marginBottom: '20px' }}>違規處理系統前端測試</h1>
            <TestSelector onSelect={handleTestSelect} />
            {selectedTest && (
                <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
                    <h2 style={{ textAlign: 'center' }}>測試案例：{selectedTest}</h2>
                    <p style={{ textAlign: 'center', color: '#666' }}>{testDescriptions[selectedTest]}</p>
                    <DataForm testCaseId={selectedTest} onSubmit={handleFormSubmit} />
                </div>
            )}
            {testResult && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        width: '100%',
                        maxWidth: '600px',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <ResultDisplay result={testResult} />
                </div>
            )}
        </div>
    );
}

export default App;
