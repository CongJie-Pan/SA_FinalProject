-- 插入 EventBasicInfo 資料
INSERT INTO EventBasicInfo (DeviceID, CaptureTime, CaptureLocation)
VALUES 
('CAM001', '2023-12-20 08:45:00', '台北市中正區信義路一段100號'),
('CAM002', '2023-12-21 14:30:00', '新北市板橋區文化路二段200號'),
('CAM003', '2023-12-22 18:15:00', '高雄市苓雅區三多路300號');

-- 插入 ViolationInfo 資料
INSERT INTO ViolationInfo (ViolationID, RoadType, ViolationType, SpeedLimit, VehicleSpeed)
VALUES
(1, '一般道路', '超速', 50, 80),
(2, '高速公路', '超速', 100, 130),
(3, '一般道路', '闖紅燈', NULL, NULL);

-- 插入 VehicleInfo 資料
INSERT INTO VehicleInfo (ViolationID, LicensePlate, VehicleType, VehicleColor, RegistrationStatus)
VALUES
(1, 'ABC1234', '小客車', '黑色', TRUE),
(2, 'XYZ5678', '休旅車', '白色', TRUE),
(3, 'DEF4321', '機車', '紅色', TRUE);

-- 插入 AIRecognition 資料
INSERT INTO AIRecognition (ViolationID, AILicensePlate, AIVehicleType, AIVehicleColor, RecognitionResult, ErrorType)
VALUES
(1, 'ABC1234', '小客車', '黑色', '成功', NULL),
(2, 'XYZ5678', '休旅車', '白色', '成功', NULL),
(3, NULL, NULL, NULL, '失敗', '影像模糊');

-- 插入 DeviceManagement 資料
INSERT INTO DeviceManagement (ViolationID, HostID, CertificateNumber)
VALUES
(1, 'H001', 'CERT12345'),
(2, 'H002', 'CERT67890'),
(3, 'H003', 'CERT54321');

-- 插入 PostProcessingStatus 資料
INSERT INTO PostProcessingStatus (ViolationID, AILicensePlateResult, ManualCheckStatus, ProcessingProgress, LogDetails)
VALUES
(1, 'ABC1234', '已確認', '處理完成', 'AI辨識正確，已確認車牌'),
(2, 'XYZ5678', '已確認', '處理完成', 'AI辨識正確，已確認車牌'),
(3, NULL, '需人工確認', '等待處理', 'AI無法辨識車牌，需人工確認');

-- 插入 TicketInfo 資料
INSERT INTO TicketInfo (ViolationID, FineAmount, CompletionTime, NotificationStatus)
VALUES
(1, 3000, '2023-12-20 10:00:00', TRUE),
(2, 6000, '2023-12-21 15:00:00', TRUE);

-- 插入 ProcessingLog 資料
INSERT INTO ProcessingLog (ViolationID, ErrorCode, ProcessedBy, ProcessedTime, Remarks)
VALUES
(1, NULL, '員工A', '2023-12-20 09:00:00', '處理順利'),
(2, NULL, '員工B', '2023-12-21 14:00:00', '處理順利'),
(3, 'E001', '員工C', '2023-12-22 19:00:00', '需人工處理');

-- 插入 NationWideCaseLog 資料
INSERT INTO NationWideCaseLog (TicketID, CaseDetails)
VALUES
(1, '台北市中正區，駕駛ABC1234因超速被開罰單'),
(2, '新北市板橋區，駕駛XYZ5678因高速公路超速被開罰單');
