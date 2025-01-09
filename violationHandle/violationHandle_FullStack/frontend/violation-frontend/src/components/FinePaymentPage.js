import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/FinePaymentPage.css'; // 假設我們將樣式放在一個單獨的 CSS 文件中

const FinePaymentPage = () => {
    const { ticketId } = useParams();
    const [violationRecord, setViolationRecord] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/tickets/${ticketId}`);
                setViolationRecord({
                    id: response.data.TicketID,
                    plateNumber: response.data.LicensePlate,
                    date: new Date(response.data.CompletionTime).toLocaleDateString(),
                    time: new Date(response.data.CompletionTime).toLocaleTimeString(),
                    // ... 設置其他必要數據
                    fine: response.data.FineAmount,
                    status: response.data.NotificationStatus ? "已通知" : "未通知",
                    // ... 其他數據
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ticket data:', error);
                setLoading(false);
            }
        };

        if (ticketId) {
            fetchTicketData();
        }
    }, [ticketId]);

    if (loading) {
        return <div>載入中...</div>;
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
            <button className="print-button">列印違規單</button>
            <button className="pay-button">立即繳費</button>
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