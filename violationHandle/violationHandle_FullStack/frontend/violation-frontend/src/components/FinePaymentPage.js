/**
 * 違規罰單詳細資訊顯示頁面，整合來自其他組件的數據並提供完整的罰單查看界面。
 * 優化數據流，直接使用已存在的數據，避免重複 API 調用。
 */

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/FinePaymentPage.css';

// 日誌記錄函數
const logInfo = (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[FinePayment][INFO] ${timestamp} - ${message}`, data || '');
};

const logError = (message, error = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[FinePayment][ERROR] ${timestamp} - ${message}`, error || '');
};

const logWarning = (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.warn(`[FinePayment][WARNING] ${timestamp} - ${message}`, data || '');
};

const FinePaymentPage = () => {

    const { ticketId } = useParams();
    const location = useLocation();
    const [violationRecord, setViolationRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 從路由狀態中獲取傳遞的數據
    const passedData = location.state || {};

    useEffect(() => {
        // 添加數據格式範例，用於驗證資料格式問題
        const sampleData = {
            ticketId: "20240001",              // 格式: YYYY + 4位序號
            licensePlate: "ABC-1234",          // 格式: 3個字母 + '-' + 4位數字
            captureDate: "2024-01-20",         // 格式: YYYY-MM-DD
            captureTime: "14:30:00",           // 格式: HH:mm:ss
            location: "台北市信義區信義路五段7號" // 格式: 地址字串
        };

        const fetchFinePaymentData = async () => {
            logInfo(`開始獲取罰單數據，罰單ID: ${ticketId}`);
            let dbConnectionStatus = '未知';
            let currentData = null; // 將 currentData 移到這裡
            
            try {
                // 檢查資料庫連接狀態
                try {
                    await axios.get('http://localhost:3001/api/health-check');
                    dbConnectionStatus = '已連接';
                } catch (dbError) {
                    dbConnectionStatus = '未連接';
                    throw new Error('資料庫連接失敗');
                }

                // 檢查 ticketId
                if (!ticketId) {
                    throw new Error('未提供罰單ID');
                }

                const response = await axios.get(`http://localhost:3001/api/fine-payment/${ticketId}`);


                // 檢查回應資料是否包含必要欄位並記錄當前數據狀態
                currentData = {
                    ticketId: response.data?.ticketInfo?.ticketId || 'NaN',
                    licensePlate: response.data?.violationInfo?.licensePlate || 'NaN',
                    captureDate: response.data?.violationInfo?.captureTime ? 
                        new Date(response.data.violationInfo.captureTime).toLocaleDateString() : 'NaN',
                    captureTime: response.data?.violationInfo?.captureTime ? 
                        new Date(response.data.violationInfo.captureTime).toLocaleTimeString() : 'NaN',
                    location: response.data?.violationInfo?.location || 'NaN'
                };

                // 數據格式驗證
                const formatValidation = {
                    ticketId: /^\d{8}$/.test(String(currentData.ticketId)),
                    licensePlate: /^[A-Z]{2,3}-\d{4}$/.test(String(currentData.licensePlate)),
                    location: currentData.location && currentData.location.length >= 3
                };

                const invalidFormats = Object.entries(formatValidation)
                    .filter(([_, isValid]) => !isValid)
                    .map(([field]) => field);

                if (invalidFormats.length > 0 || !currentData.captureDate || !currentData.captureTime) {
                    throw new Error(`數據格式不正確。
                        預期格式範例：
                        - 罰單編號: ${sampleData.ticketId}
                        - 車牌號碼: ${sampleData.licensePlate}
                        - 違規日期: ${sampleData.captureDate}
                        - 違規時間: ${sampleData.captureTime}
                        - 違規地點: ${sampleData.location}
                        `);
                }

                if (!response.data?.ticketInfo?.ticketId || 
                    !response.data?.violationInfo?.location) {
                    throw new Error(`返回的數據不完整。當前數據狀態：
                    - 罰單編號: ${currentData.ticketId}
                    - 車牌號碼: ${currentData.licensePlate}
                    - 違規日期: ${currentData.captureDate}
                    - 違規時間: ${currentData.captureTime}
                    - 違規地點: ${currentData.location}`);
                }

                // 在記錄成功的情況下也輸出數據狀態
                logInfo('成功獲取數據，當前數據狀態：', currentData);

                const recordData = {
                    id: response.data.ticketInfo.ticketId,
                    plateNumber: response.data.violationInfo.licensePlate,
                    date: new Date(response.data.violationInfo.captureTime).toLocaleDateString(),
                    time: new Date(response.data.violationInfo.captureTime).toLocaleTimeString(),
                    location: response.data.violationInfo.location,
                    type: "超速",
                    speed: "75 km/h",
                    speedLimit: "50 km/h",
                    fine: response.data.ticketInfo.fineAmount,
                    dueDate: calculateDueDate(response.data.ticketInfo.completionTime),
                    status: response.data.ticketInfo.notificationStatus ? "已通知" : "未通知",
                    deviceId: response.data.violationInfo.deviceId // 新增設備ID顯示
                };

                // 數據完整性檢查
                const requiredFields = ['id', 'plateNumber', 'date', 'location', 'fine'];
                const missingFields = requiredFields.filter(field => !recordData[field]);
                
                if (missingFields.length > 0) {
                    throw new Error(`缺少必要數據: ${missingFields.join(', ')}`);
                }

                setViolationRecord(recordData);
                setLoading(false);

            } catch (error) {
                logError('獲取罰單數據失敗', {
                    error: error.message,
                    response: error.response?.data,
                    ticketId,
                    dbConnectionStatus,
                    currentDataStatus: currentData ? '有數據' : '無數據'
                });
                setError(`系統狀態：
                    資料庫連接：${dbConnectionStatus}
                    錯誤信息：${error.message}
                    ${currentData ? `
                    當前數據狀態：
                    - 罰單編號: ${currentData.ticketId}
                    - 車牌號碼: ${currentData.licensePlate}
                    - 違規日期: ${currentData.captureDate}
                    - 違規時間: ${currentData.captureTime}
                    - 違規地點: ${currentData.location}
                    ` : '無數據'}`);
                setLoading(false);
            }
        };

        fetchFinePaymentData();
    }, [ticketId]);

    // 計算繳費期限的輔助函數
    const calculateDueDate = (completionTime) => {
        try {
            const date = new Date(completionTime);
            date.setDate(date.getDate() + 30);
            return date.toLocaleDateString();
        } catch (error) {
            logError('日期計算錯誤', error);
            return '處理中';
        }
    };

    // 處理列印功能
    const handlePrint = () => {
        logInfo('執行列印操作');
        window.print();
    };

    // 處理繳費功能
    const handlePayment = () => {
        logInfo('開始繳費流程');
        // TODO: 實現繳費邏輯
        alert('繳費功能開發中');
    };

    if (loading) {
        return <div className="loading">載入罰單資料中...</div>;
    }

    // 改進錯誤顯示
    if (error) {
        return (
            <div className="error-container" style={{
                padding: '20px',
                margin: '20px',
                backgroundColor: '#fff0f0',
                border: '1px solid #ffcdd2',
                borderRadius: '4px'
            }}>
                <h3>載入失敗</h3>
                <div style={{ 
                    whiteSpace: 'pre-line',
                    fontFamily: 'monospace',
                    backgroundColor: '#fff',
                    padding: '10px',
                    borderRadius: '4px',
                    marginBottom: '10px'
                }}>
                    {error}
                </div>
                <p>可能的原因：</p>
                <ul>
                    <li>資料庫連接問題</li>
                    <li>罰單ID不存在或已失效</li>
                    <li>數據格式不正確</li>
                    <li>相關違規記錄不完整</li>
                </ul>
                <button 
                    onClick={() => window.location.reload()}
                    style={{
                        marginTop: '10px',
                        padding: '5px 10px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    重試
                </button>
            </div>
        );
    }

    if (!violationRecord) {
        return <div className="error-message">無法載入罰單資料</div>;
    }

    return (
        <div className="fine-payment-container">
            {/* 違規詳情 */}
            <div className="violation-details">
                <h2>違規詳細資訊</h2>
                
                <div className="info-grid">
                    <div className="info-column">
                        <h3>基本資訊</h3>
                        <div className="info-item">
                            <span>違規單號</span>
                            <span>{violationRecord.id}</span>
                        </div>
                        <div className="info-item">
                            <span>車牌號碼</span>
                            <span>{violationRecord.plateNumber}</span>
                        </div>
                        <div className="info-item">
                            <span>違規日期</span>
                            <span>{violationRecord.date}</span>
                        </div>
                        <div className="info-item">
                            <span>違規時間</span>
                            <span>{violationRecord.time}</span>
                        </div>
                        <div className="info-item">
                            <span>違規地點</span>
                            <span>{violationRecord.location}</span>
                        </div>
                    </div>

                    <div className="info-column">
                        <h3>違規內容</h3>
                        <div className="info-item">
                            <span>違規類型</span>
                            <span>{violationRecord.type}</span>
                        </div>
                        <div className="info-item">
                            <span>行駛速度</span>
                            <span>{violationRecord.speed}</span>
                        </div>
                        <div className="info-item">
                            <span>速限</span>
                            <span>{violationRecord.speedLimit}</span>
                        </div>
                        <div className="info-item">
                            <span>罰鍰金額</span>
                            <span className="fine-amount">NT$ {violationRecord.fine}</span>
                        </div>
                        <div className="info-item">
                            <span>繳費期限</span>
                            <span className="due-date">{violationRecord.dueDate}</span>
                        </div>
                    </div>
                </div>

                <div className="barcode-seal-section">
                    <div className="barcode">
                        <div className="barcode-image"></div>
                        <p>違規單條碼</p>
                    </div>

                    <div className="seal">
                        <div className="seal-content">
                            <p>台北市政府</p>
                            <p>警察局</p>
                            <p>交通隊</p>
                        </div>
                        <div className="seal-date">中華民國114年</div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="print-button" onClick={handlePrint}>列印違規單</button>
                    <button className="pay-button" onClick={handlePayment}>立即繳費</button>
                </div>
            </div>

            <div className="legal-notice">
                <h4>法律效力說明</h4>
                <p>本違規通知單及條碼具有法律效力，可用於繳費及相關證明。偽造、變造或冒用者，將依法究辦。</p>
            </div>

            <div className="notice-section">
                <h3>注意事項</h3>
                <ul>
                    <li>繳費期限截止後將產生額外滯納金</li>
                    <li>如對違規認定有疑義，請於期限內提出申訴</li>
                    <li>可下載違規影像作為存證</li>
                    <li>如有疑問請撥打服務專線：0800-XXX-XXX</li>
                </ul>
            </div>
        </div>
    );
};

export default FinePaymentPage;