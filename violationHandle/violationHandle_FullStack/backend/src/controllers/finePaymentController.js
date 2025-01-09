/**
 * 罰單繳納控制器：整合所有罰單相關資訊，提供完整的罰單查詢服務
 * 負責整合 ticketInfo、vehicleInfo、aiRecognition 和 eventBasicInfo 的資料
 */

const db = require('../config/database');

exports.getFinePaymentDetails = async (req, res) => {
    const { ticketId } = req.params;
    
    try {
        // 1. 首先獲取罰單基本信息
        const [ticketRows] = await db.query(
            'SELECT * FROM TicketInfo WHERE TicketID = ?',
            [ticketId]
        );

        if (ticketRows.length === 0) {
            return res.status(404).json({ 
                message: '找不到指定的罰單',
                ticketId 
            });
        }

        const violationId = ticketRows[0].ViolationID;

        // 2. 使用 Promise.all 同時獲取其他相關資訊
        const [
            [vehicleInfoRows],
            [aiRecognitionRows],
            [eventBasicInfoRows]
        ] = await Promise.all([
            db.query('SELECT CaptureLocation FROM VehicleInfo WHERE ViolationID = ?', [violationId]),
            db.query('SELECT AILicensePlate FROM AIRecognition WHERE ViolationID = ?', [violationId]),
            db.query('SELECT CaptureTime FROM EventBasicInfo WHERE ViolationID = ?', [violationId])
        ]);

        // 3. 整合所有資訊
        const finePaymentData = {
            ticketInfo: {
                ticketId: ticketRows[0].TicketID,
                fineAmount: ticketRows[0].FineAmount,
                completionTime: ticketRows[0].CompletionTime,
                notificationStatus: ticketRows[0].NotificationStatus
            },
            violationInfo: {
                violationId: violationId,
                location: vehicleInfoRows?.[0]?.CaptureLocation,
                licensePlate: aiRecognitionRows?.[0]?.AILicensePlate,
                captureTime: eventBasicInfoRows?.[0]?.CaptureTime
            }
        };

        // 4. 記錄日誌
        console.log(`Successfully retrieved fine payment details for ticket ${ticketId}`);
        
        res.json(finePaymentData);

    } catch (error) {
        console.error('Error fetching fine payment details:', error);
        res.status(500).json({
            message: '獲取罰單資訊時發生錯誤',
            error: error.message
        });
    }
};