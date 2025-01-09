/**
 * 違規罰單詳細資訊顯示頁面，用於展示完整的罰單內容和處理繳費相關操作。
 * 整合多個資料表（ticketInfo, vehicleInfo, airecognition, eventbasicInfo）的資訊，提供完整的違規罰單檢視介面。
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/FinePaymentPage.css';

// 增強的日誌記錄函數
const logInfo = (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[FinePaymentPage] ${timestamp} - INFO: ${message}`);
    if (data) {
        console.log('詳細資訊:', data);
    }
};

const logError = (message, error, additionalInfo = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[FinePaymentPage] ${timestamp} - ERROR: ${message}`);
    console.error('錯誤詳情:', {
        message: error.message,
        stack: error.stack,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        additionalInfo
    });
};

const logWarning = (message, data = null) => {
    const timestamp = new Date().toISOString();
    console.warn(`[FinePaymentPage] ${timestamp} - WARNING: ${message}`);
    if (data) {
        console.warn('警告詳情:', data);
    }
};

// 擴展錯誤處理的類型
const ERROR_TYPES = {
    TICKET_NOT_FOUND: 'TICKET_NOT_FOUND',
    VEHICLE_INFO_ERROR: 'VEHICLE_INFO_ERROR',
    AI_RECOGNITION_ERROR: 'AI_RECOGNITION_ERROR',
    EVENT_INFO_ERROR: 'EVENT_INFO_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

// 修改 ErrorDisplay 組件以包含更多錯誤資訊
const ErrorDisplay = ({ errorType, errorMessage, errorDetails }) => {
    // 在渲染錯誤時記錄到控制台
    logError('顯示錯誤信息', new Error(errorMessage), { 
        type: errorType, 
        details: errorDetails 
    });

    return (
        <div className="error-container" style={{ 
            padding: '20px', 
            margin: '20px', 
            border: '1px solid #ff4444',
            borderRadius: '5px',
            backgroundColor: '#fff8f8' 
        }}>
            <h3 style={{ color: '#ff4444' }}>錯誤發生</h3>
            <p><strong>錯誤類型：</strong> {errorType}</p>
            <p><strong>錯誤訊息：</strong> {errorMessage}</p>
            {errorDetails && (
                <div>
                    <p><strong>詳細資訊：</strong></p>
                    <pre style={{ 
                        backgroundColor: '#f8f8f8', 
                        padding: '10px',
                        overflow: 'auto' 
                    }}>
                        {JSON.stringify(errorDetails, null, 2)}
                    </pre>
                </div>
            )}
            <button onClick={() => window.location.reload()} 
                    style={{
                        marginTop: '10px',
                        padding: '5px 10px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}>
                重新載入頁面
            </button>
        </div>
    );
};

const FinePaymentPage = () => {
    const { ticketId } = useParams();
    const [violationRecord, setViolationRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [errorDetails, setErrorDetails] = useState({
        type: null,
        message: null,
        details: null
    });

    // 增強的錯誤處理函數
    const handleError = (type, message, details) => {
        logError(`處理錯誤: ${type}`, new Error(message), details);
        
        // 根據錯誤類型記錄特定信息
        switch (type) {
            case ERROR_TYPES.TICKET_NOT_FOUND:
                logWarning('票據查詢失敗', { ticketId, details });
                break;
            case ERROR_TYPES.VEHICLE_INFO_ERROR:
                logWarning('車輛信息查詢失敗', { violationId: details?.violationId });
                break;
            case ERROR_TYPES.AI_RECOGNITION_ERROR:
                logWarning('AI辨識結果查詢失敗', { violationId: details?.violationId });
                break;
            case ERROR_TYPES.EVENT_INFO_ERROR:
                logWarning('事件信息查詢失敗', { violationId: details?.violationId });
                break;
            default:
                logWarning('未知錯誤類型', { type, message });
        }

        setErrorDetails({ type, message, details });
        setLoading(false);
    };

    useEffect(() => {
        const fetchTicketData = async () => {
            logInfo(`開始獲取罰單數據，罰單ID: ${ticketId}`);
            try {
                // 修正: 使用正確的 controller 路徑
                const ticketResponse = await axios.get(`http://localhost:3001/tickets/${ticketId}`);
                
                if (!ticketResponse.data) {
                    throw new Error('票據資料為空');
                }

                logInfo('票據資料:', ticketResponse.data);
                const violationId = ticketResponse.data.ViolationID;

                try {
                    // 修正: 使用正確的 controller 路徑
                    const [vehicleResponse, aiResponse, eventResponse] = await Promise.all([
                        axios.get(`http://localhost:3001/vehicle-info/${violationId}`),
                        axios.get(`http://localhost:3001/ai-recognition/${violationId}`),
                        axios.get(`http://localhost:3001/event-basic-info/${violationId}`)
                    ]);

                    logInfo('各API響應數據:', {
                        vehicle: vehicleResponse.data,
                        ai: aiResponse.data,
                        event: eventResponse.data
                    });

                    // 計算繳費期限（罰單成立時間+30天）
                    const completionDate = new Date(ticketResponse.data.CompletionTime);
                    const dueDate = new Date(completionDate);
                    dueDate.setDate(dueDate.getDate() + 30);

                    // 整合所有資訊
                    const recordData = {
                        // 基本資訊 - 從資料庫獲取
                        id: ticketResponse.data.TicketID,
                        plateNumber: aiResponse.data.AILicensePlate,
                        date: new Date(eventResponse.data.CaptureTime).toLocaleDateString(),
                        time: new Date(eventResponse.data.CaptureTime).toLocaleTimeString(),
                        location: vehicleResponse.data.CaptureLocation,

                        // 違規內容 - 部分內定值
                        type: "超速",
                        speed: "75 km/h",
                        speedLimit: "50 km/h",

                        // 罰款資訊
                        fine: ticketResponse.data.FineAmount,
                        dueDate: dueDate.toLocaleDateString(),
                        status: ticketResponse.data.NotificationStatus ? "已通知" : "未通知"
                    };

                    logInfo(`數據整合完成: ${JSON.stringify(recordData)}`);
                    setViolationRecord(recordData);
                    setLoading(false);

                } catch (error) {
                    logError('獲取關聯數據失敗', error, {
                        violationId,
                        errorPath: error.config?.url,
                        errorStatus: error.response?.status
                    });
                    throw error;
                }
            } catch (error) {
                if (!errorDetails.type) {
                    handleError(
                        ERROR_TYPES.UNKNOWN_ERROR,
                        '處理罰單數據時發生未知錯誤',
                        { error: error.message, timestamp: new Date().toISOString() }
                    );
                }
            }
        };

        if (ticketId) {
            fetchTicketData();
        }
    }, [ticketId]);

    // 處理列印功能
    const handlePrint = () => {
        logInfo('開始執行列印操作');
        window.print();
    };

    // 處理繳費功能
    const handlePayment = () => {
        logInfo('開始處理繳費請求');
        // 這裡可以添加繳費邏輯
        alert('繳費功能開發中');
    };

    if (loading) {
        return <div>載入中...</div>;
    }

    if (errorDetails.type) {
        return <ErrorDisplay 
            errorType={errorDetails.type}
            errorMessage={errorDetails.message}
            errorDetails={errorDetails.details}
        />;
    }

    return (
        <div className="fine-payment-container">
            {/* 違規詳情 */}
            <div className="violation-details">
                <h2>違規詳細資訊</h2>
                <div className="info-grid">
                    <div className="info-column">
                        <h3>基本資訊</h3>
                        {/* 修正：移除多餘的 div 結束標籤，並修正標籤嵌套 */}
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

                {/* 條碼和印章區域 */}
                <div className="barcode-seal-section">
                    <div className="barcode">
                        <div className="barcode-image"></div>
                        <p>違規單條碼</p>
                    </div>

                    <div className="seal">
                        <div className="seal-content">
                            <p>桃園市政府</p>
                            <p>警察局</p>
                            <p>交通隊</p>
                        </div>
                        <div className="seal-date">中華民國112年</div>
                    </div>
                </div>

                {/* 操作按鈕 */}
                <div className="action-buttons">
                    <button className="print-button" onClick={handlePrint}>列印違規單</button>
                    <button className="pay-button" onClick={handlePayment}>立即繳費</button>
                </div>
            </div>

            {/* 法規提示 */}
            <div className="legal-notice">
                <h4>法律效力說明</h4>
                <p>本違規通知單及條碼具有法律效力，可用於繳費及相關證明。偽造、變造或冒用者，將依法究辦。</p>
            </div>

            {/* 說明區域 */}
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