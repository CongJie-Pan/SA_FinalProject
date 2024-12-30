// 此元件用於顯示罰單的詳細資訊
// 實現一個彈出視窗形式的介面，展示罰單的各項資料

// 引入React函式庫
import React from 'react';

// 定義TicketPage元件，接收罰單資料和關閉函數作為props
const TicketPage = ({ ticketData, onClose }) => {
    // 返回一個覆蓋整個螢幕的半透明背景層
    return (
        // 外層容器：設定固定定位和半透明黑色背景
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '500px',
                width: '90%'
            }}>
                <h2>罰單詳情</h2>
                {/* 條件渲染：如果有罰單資料則顯示詳細資訊，否則顯示載入提示 */}
                {ticketData ? (
                    // 顯示罰單的各項詳細資訊
                    <div>
                        <p>罰單 ID: {ticketData.TicketID}</p>
                        <p>違規 ID: {ticketData.ViolationID}</p>
                        <p>罰款金額: ${ticketData.FineAmount}</p>
                        <p>開立日期: {new Date(ticketData.IssuedDate).toLocaleString()}</p>
                        <p>處理狀態: {ticketData.Status || '已開立'}</p>
                    </div>
                ) : (
                    // 載入中的提示訊息
                    <p>載入罰單資料中...</p>
                )}
                {/* 關閉按鈕：點擊時調用onClose函數 */}
                <button 
                    onClick={onClose}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                    關閉
                </button>
            </div>
        </div>
    );
};

export default TicketPage;