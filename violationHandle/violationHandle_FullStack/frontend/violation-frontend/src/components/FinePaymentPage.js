/**
 * 違規罰單詳細資訊顯示頁面，整合來自其他組件的數據並提供完整的罰單查看界面。
 * 優化數據流，直接使用已存在的數據，避免重複 API 調用。
 */

import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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

// 日期時間格式化工具
const dateTimeUtils = {
    formatDate: (dateString) => {
        if (!dateString) return 'N/A';
        try {
            // 檢查日期字符串格式並處理
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }
            return date.toLocaleDateString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch (error) {
            logError('日期格式化失敗', { dateString, error });
            return 'N/A';
        }
    },

    formatTime: (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw new Error('Invalid time');
            }
            return date.toLocaleTimeString('zh-TW', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } catch (error) {
            logError('時間格式化失敗', { dateString, error });
            return 'N/A';
        }
    }
};

const FinePaymentPage = () => {
    const { ticketId } = useParams();
    const location = useLocation();
    const [violationRecord, setViolationRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // 添加 error state

    // 從路由狀態中獲取傳遞的數據
    const passedData = location.state || {};

    useEffect(() => {
        logInfo('初始化罰單頁面', { ticketId, passedData });

        if (passedData.ticketData) {
            try {
                // 從各資料表整合數據
                const combinedData = {
                    // 從 TicketInfo 表獲取
                    id: passedData.ticketData.TicketID,         // 罰單單號

                    // 從 VehicleInfo 表獲取
                    location: passedData.vehicleInfo?.CaptureLocation || 'N/A',  // 違規地點

                    // 從 AIRecognition 表獲取
                    plateNumber: passedData.aiData?.AILicensePlate || 'N/A',    // AI辨識車牌

                    // 從 EventBasicInfo 表獲取並格式化
                    date: dateTimeUtils.formatDate(passedData.eventData?.CaptureTime),  // 違規日期
                    time: dateTimeUtils.formatTime(passedData.eventData?.CaptureTime),  // 違規時間

                    // 其他固定或計算資料
                    type: "超速",
                    speed: "75 km/h",
                    speedLimit: "50 km/h",
                    fine: passedData.ticketData.FineAmount,
                    dueDate: calculateDueDate(passedData.ticketData.CompletionTime),
                    status: passedData.ticketData.NotificationStatus ? "已通知" : "未通知"
                };

                // 驗證關鍵數據是否存在
                const requiredFields = {
                    '罰單單號': combinedData.id,
                    '違規地點': combinedData.location,
                    '車牌號碼': combinedData.plateNumber,
                    '違規日期': combinedData.date,
                    '違規時間': combinedData.time
                };

                const missingFields = Object.entries(requiredFields)
                    .filter(([_, value]) => !value || value === 'N/A')
                    .map(([field]) => field);

                if (missingFields.length > 0) {
                    throw new Error(`缺少必要資料: ${missingFields.join(', ')}`);
                }

                logInfo('數據整合完成', {
                    ticketId: combinedData.id,
                    location: combinedData.location,
                    plateNumber: combinedData.plateNumber,
                    datetime: `${combinedData.date} ${combinedData.time}`
                });

                setViolationRecord(combinedData);
                setLoading(false);

            } catch (error) {
                logError('數據整合失敗', {
                    error: error.message,
                    passedData: {
                        ticketId: passedData.ticketData?.TicketID,
                        location: passedData.vehicleInfo?.CaptureLocation,
                        plateNumber: passedData.aiData?.AILicensePlate,
                        captureTime: passedData.eventData?.CaptureTime
                    }
                });
                setError(error.message);
                setLoading(false);
            }
        }
    }, [ticketId, passedData]);

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

    // 更新錯誤處理部分
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
                <p>{error}</p>
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

    if (loading) {
        return <div className="loading">載入罰單資料中...</div>;
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