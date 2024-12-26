import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseContent = () => {
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
                setError('無法載入數據');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                <>
                    <p>總共 {violations.length} 個違規事件</p>
                    <ul>
                        {violations.map(violation => (
                            <li key={violation.ViolationID}>
                                ID: {violation.ViolationID},
                                地點: {violation.CaptureLocation},
                                時間: {new Date(violation.CaptureTime).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </>
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
                <>
                    <p>總共 {tickets.length} 張罰單</p>
                    <ul>
                        {tickets.map(ticket => (
                            <li key={ticket.ViolationID}>
                                罰單號: {ticket.ViolationID},
                                金額: {ticket.FineAmount},
                                開立時間: {new Date(ticket.CompletionTime).toLocaleString()},
                                通知狀態: {ticket.NotificationStatus ? '已通知' : '未通知'}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            minHeight: '100vh',
        }}>
            <h1>資料庫內容預覽</h1>
            {renderViolationsList()}
            {renderTicketsList()}
        </div>
    );
};

export default DatabaseContent;