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

const FinePaymentPage = () => {
    const { ticketId } = useParams();
    const location = useLocation();
    const [violationRecord, setViolationRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    // 從路由狀態中獲取傳遞的數據
    const passedData = location.state || {};

    useEffect(() => {
        logInfo('初始化罰單頁面', { ticketId, passedData });

        if (passedData.ticketData) {
            try {
                // 整合所有需要的數據
                const combinedData = {
                    // 基本信息 - 從 TicketPage 傳來的數據
                    id: passedData.ticketData.TicketID,
                    plateNumber: passedData.aiData?.AILicensePlate || 'N/A',
                    date: new Date(passedData.eventData?.CaptureTime).toLocaleDateString(),
                    time: new Date(passedData.eventData?.CaptureTime).toLocaleTimeString(),
                    location: passedData.eventData?.CaptureLocation || 'N/A',

                    // 違規內容 - 部分使用固定值
                    type: "超速",
                    speed: "75 km/h",
                    speedLimit: "50 km/h",

                    // 罰款信息
                    fine: passedData.ticketData.FineAmount,
                    // 計算繳費期限（罰單開立日期+30天）
                    dueDate: calculateDueDate(passedData.ticketData.CompletionTime),
                    status: passedData.ticketData.NotificationStatus ? "已通知" : "未通知"
                };

                logInfo('數據整合完成', combinedData);
                setViolationRecord(combinedData);
                setLoading(false);

            } catch (error) {
                logError('數據處理過程中發生錯誤', error);
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