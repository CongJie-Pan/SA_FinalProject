/**
 * 罰單繳納控制器：整合所有罰單相關資訊，提供完整的罰單查詢服務
 * 負責整合 ticketInfo、vehicleInfo、aiRecognition 和 eventBasicInfo 的資料
 */


const db = require('../config/database');

// 添加詳細的日誌記錄函數
const logQuery = (query, params) => {
    console.log('Executing query:', {
        sql: query.replace(/\s+/g, ' ').trim(),
        parameters: params
    });
};

exports.getFinePaymentDetails = async (req, res) => {
    const { ticketId } = req.params;
    console.log('Processing request for ticket:', ticketId);
    
    try {
        // 驗證輸入
        if (!ticketId || isNaN(ticketId)) {
            return res.status(400).json({
                status: 'error',
                message: '無效的罰單ID',
                details: { providedTicketId: ticketId }
            });
        }

        // 確保資料庫連接並選擇正確的資料庫
        await db.query('USE SA_Final_PJ');

        // 改進的數據庫查詢，添加資料庫指定
        const ticketQuery = `
            USE SA_Final_PJ;
            SELECT 
                t.TicketID,
                t.ViolationID,
                t.FineAmount,
                t.CompletionTime,
                t.NotificationStatus,
                e.CaptureLocation,
                e.CaptureTime,
                e.DeviceID,
                v.LicensePlate,
                COALESCE(v.LicensePlate, a.AILicensePlate) as FinalLicensePlate
            FROM SA_Final_PJ.TicketInfo t
            INNER JOIN SA_Final_PJ.EventBasicInfo e ON t.ViolationID = e.ViolationID
            LEFT JOIN SA_Final_PJ.VehicleInfo v ON t.ViolationID = v.ViolationID
            LEFT JOIN SA_Final_PJ.AIRecognition a ON t.ViolationID = a.ViolationID
            WHERE t.TicketID = ?`;

        // 添加查詢日誌
        logQuery(ticketQuery, [ticketId]);

        // 執行查詢前先檢查資料庫連接狀態
        try {
            await db.query('SELECT 1');
        } catch (dbError) {
            console.error('Database connection check failed:', dbError);
            throw new Error('資料庫連接檢查失敗');
        }

        const [results] = await db.query(ticketQuery, [ticketId]);

        // 詳細的數據驗證
        if (results.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: '找不到罰單資料',
                details: {
                    ticketId,
                    timestamp: new Date().toISOString()
                }
            });
        }

        const record = results[0];
        
        // 驗證必要欄位
        const requiredFields = {
            ticketId: record.TicketID,
            violationId: record.ViolationID,
            location: record.CaptureLocation,
            captureTime: record.CaptureTime
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([key, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return res.status(500).json({
                status: 'error',
                message: '罰單資料不完整',
                details: {
                    missingFields,
                    ticketId,
                    timestamp: new Date().toISOString()
                }
            });
        }

        // 整理響應數據
        const finePaymentData = {
            ticketInfo: {
                ticketId: record.TicketID,
                violationId: record.ViolationID,
                fineAmount: record.FineAmount || 0,
                completionTime: record.CompletionTime,
                notificationStatus: Boolean(record.NotificationStatus)
            },
            violationInfo: {
                location: record.CaptureLocation,
                licensePlate: record.FinalLicensePlate || '無法識別',
                captureTime: record.CaptureTime,
                deviceId: record.DeviceID
            },
            metadata: {
                dataSource: {
                    licensePlate: record.LicensePlate ? 'VehicleInfo' : 'AIRecognition',
                    timestamp: new Date().toISOString()
                }
            }
        };

        // 記錄成功響應
        console.log('Successfully retrieved fine payment data:', {
            ticketId,
            hasLicensePlate: !!finePaymentData.violationInfo.licensePlate,
            hasLocation: !!finePaymentData.violationInfo.location,
            timestamp: new Date().toISOString()
        });

        res.json({
            status: 'success',
            data: finePaymentData,
            message: '成功獲取罰單資料'
        });

    } catch (error) {
        console.error('Error processing fine payment request:', {
            error: error.message,
            stack: error.stack,
            ticketId,
            timestamp: new Date().toISOString()
        });

        res.status(500).json({
            status: 'error',
            message: '處理罰單資料時發生錯誤',
            details: {
                errorMessage: error.message,
                ticketId,
                timestamp: new Date().toISOString()
            }
        });
    }
};