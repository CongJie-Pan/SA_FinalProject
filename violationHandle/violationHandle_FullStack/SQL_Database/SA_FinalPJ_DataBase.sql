-- 建立資料庫
USE SA_Final_PJ;

-- 1. 事件基本資料表
CREATE TABLE EventBasicInfo (
    ViolationID INT AUTO_INCREMENT PRIMARY KEY, -- 使用 INT 且啟用自動遞增
    DeviceID CHAR(20) NOT NULL COMMENT '拍攝設備的編號',
    CaptureTime TIMESTAMP NOT NULL COMMENT '拍攝時間',
    CaptureLocation TEXT NOT NULL COMMENT '拍攝地點'
) COMMENT '事件基本資料表，用於存儲拍攝當下的核心信息';

-- 2. 實際違規資訊與違規類型表
CREATE TABLE ViolationInfo (
    ViolationID INT NOT NULL, -- 與 EventBasicInfo 的 ViolationID 一致
    RoadType CHAR(10) COMMENT '道路類型（一般道路或高速公路）',
    ViolationType CHAR(50) COMMENT '違規類型，例如超速',
    SpeedLimit INT COMMENT '道路速限 (km/h)',
    VehicleSpeed INT COMMENT '車速 (km/h)',
    PRIMARY KEY (ViolationID),
    CONSTRAINT FK_ViolationInfo_EventBasicInfo FOREIGN KEY (ViolationID)
        REFERENCES EventBasicInfo(ViolationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '實際違規相關資訊表，記錄違規細節';

-- 3. 車輛資料表
CREATE TABLE VehicleInfo (
    ViolationID INT NOT NULL,
    LicensePlate CHAR(10) COMMENT '車牌號碼',
    vehicleRegisterName CHAR(10) COMMENT '車輛登記人'
    VehicleType CHAR(20) COMMENT '車型',
    VehicleColor CHAR(20) COMMENT '車輛顏色',
    RegistrationStatus BOOLEAN COMMENT '車籍資料匹配確認狀態',
    PRIMARY KEY (ViolationID),
    CONSTRAINT FK_VehicleInfo_EventBasicInfo FOREIGN KEY (ViolationID)
        REFERENCES EventBasicInfo(ViolationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '車輛資料表，存儲與違規車輛相關的信息';

-- 4. AI辨識表
CREATE TABLE AIRecognition (
    ViolationID INT NOT NULL,
    AILicensePlate CHAR(10) COMMENT 'AI辨識車牌號碼',
    AIVehicleType CHAR(20) COMMENT 'AI辨識車型',
    AIVehicleColor CHAR(20) COMMENT 'AI辨識車輛顏色',
    RecognitionResult CHAR(20) COMMENT '辨識結果（成功或失敗）',
    ErrorType CHAR(50) COMMENT '辨識錯誤類型',
    PRIMARY KEY (ViolationID),
    CONSTRAINT FK_AIRecognition_EventBasicInfo FOREIGN KEY (ViolationID)
        REFERENCES EventBasicInfo(ViolationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT 'AI辨識表，用於記錄AI處理結果';

-- 5. 設備管理與案件追蹤表
CREATE TABLE DeviceManagement (
    ViolationID INT NOT NULL,
    HostID CHAR(20) COMMENT '拍攝違規事件的主機編號',
    CertificateNumber CHAR(20) COMMENT '證號',
    PRIMARY KEY (ViolationID),
    CONSTRAINT FK_DeviceManagement_EventBasicInfo FOREIGN KEY (ViolationID)
        REFERENCES EventBasicInfo(ViolationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '設備管理表，追蹤拍攝設備';

-- 6. 拍攝後處理狀態表
CREATE TABLE PostProcessingStatus (
    ViolationID INT NOT NULL,
    AILicensePlateResult CHAR(10) COMMENT 'AI車牌辨識結果',
    ManualCheckStatus CHAR(20) COMMENT '人工確認狀態',
    ProcessingProgress CHAR(50) COMMENT '處理進度',
    LogDetails TEXT COMMENT '處理紀錄的詳細內容',
    PRIMARY KEY (ViolationID),
    CONSTRAINT FK_PostProcessingStatus_EventBasicInfo FOREIGN KEY (ViolationID)
        REFERENCES EventBasicInfo(ViolationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '拍攝後處理狀態表，記錄處理流程進度';

-- 7. 罰單資料表
CREATE TABLE TicketInfo (
    TicketID INT AUTO_INCREMENT PRIMARY KEY COMMENT '唯一的罰單編號',
    ViolationID INT NOT NULL COMMENT '關聯的違規ID',
    FineAmount INT NOT NULL COMMENT '罰金金額',
    CompletionTime TIMESTAMP COMMENT '處理完成時間',
    NotificationStatus BOOLEAN NOT NULL COMMENT '是否通知車主',
    CONSTRAINT FK_TicketInfo_EventBasicInfo FOREIGN KEY (ViolationID)
        REFERENCES EventBasicInfo(ViolationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '罰單資料表，用於記錄違規處理後產生的罰單信息';

-- 8. 處理誌表
CREATE TABLE ProcessingLog (
    LogID SERIAL PRIMARY KEY COMMENT '處理記錄ID',
    ViolationID INT NOT NULL COMMENT '違規事件ID',
    ErrorCode CHAR(50) COMMENT '處理錯誤碼',
    ProcessedBy CHAR(50) COMMENT '處理人員',
    ProcessedTime DATETIME COMMENT '處理時間',
    Remarks TEXT COMMENT '處理備註',
    CONSTRAINT FK_ProcessingLog_EventBasicInfo FOREIGN KEY (ViolationID)
        REFERENCES EventBasicInfo(ViolationID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '處理誌表，用於存儲每次處理的詳細記錄';

-- 9. 全國舉發案件處理檔
CREATE TABLE NationWideCaseLog (
    LogID INT AUTO_INCREMENT PRIMARY KEY COMMENT '案件處理紀錄ID',
    TicketID INT NOT NULL COMMENT '罰單編號',
    CaseDetails TEXT COMMENT '案件處理紀錄',
    CONSTRAINT FK_NationWideCaseLog_TicketInfo FOREIGN KEY (TicketID)
        REFERENCES TicketInfo(TicketID)
        ON DELETE CASCADE ON UPDATE CASCADE
) COMMENT '全國舉發案件處理檔，記錄案件的處理過程和結果';

