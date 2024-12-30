// 此元件用於顯示罰單的詳細資訊
// 實現一個彈出視窗形式的介面，展示罰單的各項資料

// 引入React函式庫
import React from 'react';

// 定義TicketPage元件，接收罰單資料和關閉函數作為props
const TicketPage = ({ ticketData, onClose }) => {
    return (
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
                {ticketData ? (
                    <div>
                        <p>罰單 ID: {ticketData.TicketID}</p>
                        <p>違規 ID: {ticketData.ViolationID}</p>
                        <p>罰款金額: ${ticketData.FineAmount}</p>
                        <p>開立日期: {new Date(ticketData.IssuedDate).toLocaleString()}</p>
                        <p>處理狀態: {ticketData.Status || '已開立'}</p>
                    </div>
                ) : (
                    <p>載入罰單資料中...</p>
                )}
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