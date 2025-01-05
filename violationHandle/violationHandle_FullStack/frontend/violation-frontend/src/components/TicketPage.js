import React from 'react';

const TicketPage = ({ ticketData, onClose }) => {
    // 格式化日期的函數
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };
    const onSubmit = () => {
        window.open('https://claude.site/artifacts/0e57ca36-8d41-4951-9738-c0e9693506f6', '_blank');
    };

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
                <h2>罰單簡要資訊</h2>
                {ticketData ? (
                    <div>
                        <p>罰單 ID: {ticketData.TicketID}</p>
                        <p>違規 ID: {ticketData.ViolationID}</p>
                        <p>罰款金額: ${ticketData.FineAmount}</p>
                        <p>開立日期: {formatDate(ticketData.CompletionTime)}</p>
                        <p>處理狀態: {ticketData.NotificationStatus ? '罰單已通知車主' : '罰單尚未通知車主'}</p>
                    </div>
                ) : (
                    <p>載入罰單資料中...</p>
                )}
                <button
                    onClick={onClose}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                    關閉
                </button>
                <button
                    onClick={onSubmit}
                    style={{
                        marginTop: '20px',
                        marginLeft: '270px',
                        padding: '10px 20px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                    確認無誤，送出通知
                </button>
            </div>
        </div>
    );
};

export default TicketPage;