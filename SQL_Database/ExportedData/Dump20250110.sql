CREATE DATABASE  IF NOT EXISTS `sa_final_pj` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sa_final_pj`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sa_final_pj
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airecognition`
--

DROP TABLE IF EXISTS `airecognition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airecognition` (
  `ViolationID` int NOT NULL,
  `AILicensePlate` char(10) DEFAULT NULL COMMENT 'AI辨識車牌號碼',
  `AIVehicleType` char(20) DEFAULT NULL COMMENT 'AI辨識車型',
  `AIVehicleColor` char(20) DEFAULT NULL COMMENT 'AI辨識車輛顏色',
  `RecognitionResult` char(20) DEFAULT NULL COMMENT '辨識結果（成功或失敗）',
  `ErrorType` char(50) DEFAULT NULL COMMENT '辨識錯誤類型',
  PRIMARY KEY (`ViolationID`),
  CONSTRAINT `FK_AIRecognition_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='AI辨識表，用於記錄AI處理結果';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airecognition`
--

LOCK TABLES `airecognition` WRITE;
/*!40000 ALTER TABLE `airecognition` DISABLE KEYS */;
INSERT INTO `airecognition` VALUES (1,'7336GN',NULL,NULL,'7336GN',NULL),(2,'0852UH',NULL,NULL,'0852UH',NULL),(3,'YP8549',NULL,NULL,'YP8549',NULL),(4,'225373',NULL,NULL,'225373',NULL),(5,'829MGE',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(6,'C505ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(8,'0852UH',NULL,NULL,'0852UH',NULL),(9,'829MGE',NULL,NULL,'829MGE',NULL),(10,'7336GN',NULL,NULL,'7336GN',NULL),(11,'0852UH',NULL,NULL,'0852UH',NULL),(12,'7336GN',NULL,NULL,'7336GN',NULL),(13,'0852UH',NULL,NULL,'0852UH',NULL),(14,'0852UH',NULL,NULL,'0852UH',NULL),(15,'0852UH',NULL,NULL,'0852UH',NULL),(16,'0852UH',NULL,NULL,'0852UH',NULL),(17,'0852UH',NULL,NULL,'0852UH',NULL),(18,'7336GN',NULL,NULL,'7336GN',NULL),(19,'0852UH',NULL,NULL,'0852UH',NULL),(20,'0852UH',NULL,NULL,'0852UH',NULL),(21,'7336GN',NULL,NULL,'7336GN',NULL),(22,'0852UH',NULL,NULL,'0852UH',NULL),(23,'7336GN',NULL,NULL,'7336GN',NULL),(24,'7336GN',NULL,NULL,'7336GN',NULL),(25,'0852UH',NULL,NULL,'0852UH',NULL),(26,'0852UH',NULL,NULL,'0852UH',NULL),(27,'0852UH',NULL,NULL,'0852UH',NULL),(28,'7336GN',NULL,NULL,'7336GN',NULL),(29,'0852UH',NULL,NULL,'0852UH',NULL),(30,'0852UH',NULL,NULL,'0852UH',NULL);
/*!40000 ALTER TABLE `airecognition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devicemanagement`
--

DROP TABLE IF EXISTS `devicemanagement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devicemanagement` (
  `ViolationID` int NOT NULL,
  `HostID` char(20) DEFAULT NULL COMMENT '拍攝違規事件的主機編號',
  `CertificateNumber` char(20) DEFAULT NULL COMMENT '證號',
  PRIMARY KEY (`ViolationID`),
  CONSTRAINT `FK_DeviceManagement_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='設備管理表，追蹤拍攝設備';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devicemanagement`
--

LOCK TABLES `devicemanagement` WRITE;
/*!40000 ALTER TABLE `devicemanagement` DISABLE KEYS */;
/*!40000 ALTER TABLE `devicemanagement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventbasicinfo`
--

DROP TABLE IF EXISTS `eventbasicinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventbasicinfo` (
  `ViolationID` int NOT NULL AUTO_INCREMENT,
  `DeviceID` char(20) NOT NULL COMMENT '拍攝設備的編號',
  `CaptureTime` timestamp NOT NULL COMMENT '拍攝時間',
  `CaptureLocation` text NOT NULL COMMENT '拍攝地點',
  PRIMARY KEY (`ViolationID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='事件基本資料表，用於存儲拍攝當下的核心信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventbasicinfo`
--

LOCK TABLES `eventbasicinfo` WRITE;
/*!40000 ALTER TABLE `eventbasicinfo` DISABLE KEYS */;
INSERT INTO `eventbasicinfo` VALUES (1,'027','2025-01-09 09:03:35','台北市北投區中央南路三段30號'),(2,'295','2025-01-09 09:03:52','台北市士林區天母東路5號'),(3,'053','2025-01-09 09:04:06','台北市大安區辛亥路二段270號'),(4,'099','2025-01-09 09:04:15','台北市大安區新生南路三段105號'),(5,'129','2025-01-09 09:04:34','台北市內湖區湖光路8號'),(6,'003','2025-01-09 09:04:49','台北市士林區天母東路5號'),(7,'152','2025-01-09 09:07:32','台北市信義區和平東路二段90號'),(8,'058','2025-01-09 09:07:45','台北市大安區辛亥路二段270號'),(9,'074','2025-01-09 09:12:36','台北市內湖區陽光街78號'),(10,'219','2025-01-09 09:35:48','台北市松山區健康路5號'),(11,'060','2025-01-09 09:51:05','台北市北投區中央北路二段50號'),(12,'242','2025-01-09 10:06:01','台北市中山區民權東路二段100號'),(13,'004','2025-01-09 10:17:49','台北市文山區福興路18號'),(14,'188','2025-01-09 13:11:23','台北市信義區忠孝東路五段510號'),(15,'233','2025-01-09 13:33:28','台北市大安區和平東路三段56號'),(16,'057','2025-01-09 13:59:20','台北市大安區和平東路四段15號'),(17,'288','2025-01-09 14:37:42','台北市中正區羅斯福路三段100號'),(18,'109','2025-01-09 14:43:59','台北市萬華區西園路二段10號'),(19,'088','2025-01-10 01:27:32','台北市萬華區成都路60號'),(20,'130','2025-01-10 01:39:54','台北市北投區大業路60號'),(21,'017','2025-01-10 01:53:25','台北市士林區福德路100號'),(22,'101','2025-01-10 02:18:25','台北市大安區辛亥路二段270號'),(23,'024','2025-01-10 02:27:25','台北市文山區保儀路90號'),(24,'286','2025-01-10 02:44:27','台北市中正區仁愛路一段89號'),(25,'281','2025-01-10 03:18:33','台北市中山區建國北路18號'),(26,'229','2025-01-10 05:45:08','台北市萬華區西園路二段10號'),(27,'146','2025-01-10 05:48:53','台北市萬華區和平西路三段88號'),(28,'011','2025-01-10 05:52:46','台北市中正區南昌路二段10號'),(29,'231','2025-01-10 06:12:06','台北市內湖區環山路一段88號'),(30,'163','2025-01-10 06:41:18','台北市內湖區民權東路六段200號');
/*!40000 ALTER TABLE `eventbasicinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nationwidecaselog`
--

DROP TABLE IF EXISTS `nationwidecaselog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nationwidecaselog` (
  `LogID` int NOT NULL AUTO_INCREMENT COMMENT '案件處理紀錄ID',
  `TicketID` int NOT NULL COMMENT '罰單編號',
  `CaseDetails` text COMMENT '案件處理紀錄',
  PRIMARY KEY (`LogID`),
  KEY `FK_NationWideCaseLog_TicketInfo` (`TicketID`),
  CONSTRAINT `FK_NationWideCaseLog_TicketInfo` FOREIGN KEY (`TicketID`) REFERENCES `ticketinfo` (`TicketID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='全國舉發案件處理檔，記錄案件的處理過程和結果';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nationwidecaselog`
--

LOCK TABLES `nationwidecaselog` WRITE;
/*!40000 ALTER TABLE `nationwidecaselog` DISABLE KEYS */;
/*!40000 ALTER TABLE `nationwidecaselog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postprocessingstatus`
--

DROP TABLE IF EXISTS `postprocessingstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postprocessingstatus` (
  `ViolationID` int NOT NULL,
  `AILicensePlateResult` char(10) DEFAULT NULL COMMENT 'AI車牌辨識結果',
  `ManualCheckStatus` char(20) DEFAULT NULL COMMENT '人工確認狀態',
  `ProcessingProgress` char(50) DEFAULT NULL COMMENT '處理進度',
  `LogDetails` text COMMENT '處理紀錄的詳細內容',
  PRIMARY KEY (`ViolationID`),
  CONSTRAINT `FK_PostProcessingStatus_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='拍攝後處理狀態表，記錄處理流程進度';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postprocessingstatus`
--

LOCK TABLES `postprocessingstatus` WRITE;
/*!40000 ALTER TABLE `postprocessingstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `postprocessingstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processinglog`
--

DROP TABLE IF EXISTS `processinglog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processinglog` (
  `LogID` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '處理記錄ID',
  `ViolationID` int NOT NULL COMMENT '違規事件ID',
  `ErrorCode` char(50) DEFAULT NULL COMMENT '處理錯誤碼',
  `ProcessedBy` char(50) DEFAULT NULL COMMENT '處理人員',
  `ProcessedTime` datetime DEFAULT NULL COMMENT '處理時間',
  `Remarks` text COMMENT '處理備註',
  PRIMARY KEY (`LogID`),
  UNIQUE KEY `LogID` (`LogID`),
  KEY `FK_ProcessingLog_EventBasicInfo` (`ViolationID`),
  CONSTRAINT `FK_ProcessingLog_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='處理誌表，用於存儲每次處理的詳細記錄';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processinglog`
--

LOCK TABLES `processinglog` WRITE;
/*!40000 ALTER TABLE `processinglog` DISABLE KEYS */;
INSERT INTO `processinglog` VALUES (45,8,'00','System','2025-01-09 17:07:47','罰單生成完成'),(46,8,'00','System','2025-01-09 17:11:38','罰單生成完成'),(47,9,'00','System','2025-01-09 17:12:39','罰單生成完成'),(48,10,'00','System','2025-01-09 17:35:52','罰單生成完成'),(49,11,'00','System','2025-01-09 17:51:09','罰單生成完成'),(50,12,'00','System','2025-01-09 18:06:04','罰單生成完成'),(51,13,'00','System','2025-01-09 18:17:55','罰單生成完成'),(52,14,'00','System','2025-01-09 21:11:30','罰單生成完成'),(53,15,'00','System','2025-01-09 21:33:31','罰單生成完成'),(54,16,'00','System','2025-01-09 21:59:23','罰單生成完成'),(55,17,'00','System','2025-01-09 22:37:47','罰單生成完成'),(56,18,'00','System','2025-01-09 22:44:02','罰單生成完成'),(57,19,'00','System','2025-01-10 09:27:36','罰單生成完成'),(58,20,'00','System','2025-01-10 09:39:57','罰單生成完成'),(59,21,'00','System','2025-01-10 09:53:29','罰單生成完成'),(60,22,'00','System','2025-01-10 10:18:27','罰單生成完成'),(61,23,'00','System','2025-01-10 10:27:29','罰單生成完成'),(62,24,'00','System','2025-01-10 10:44:30','罰單生成完成'),(63,25,'00','System','2025-01-10 11:18:36','罰單生成完成'),(64,26,'00','System','2025-01-10 13:45:11','罰單生成完成'),(65,27,'00','System','2025-01-10 13:49:01','罰單生成完成'),(66,28,'00','System','2025-01-10 13:52:54','罰單生成完成'),(67,29,'00','System','2025-01-10 14:12:10','罰單生成完成'),(68,30,'00','System','2025-01-10 14:41:21','罰單生成完成');
/*!40000 ALTER TABLE `processinglog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketinfo`
--

DROP TABLE IF EXISTS `ticketinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticketinfo` (
  `TicketID` int NOT NULL AUTO_INCREMENT COMMENT '唯一的罰單編號',
  `ViolationID` int NOT NULL COMMENT '關聯的違規ID',
  `FineAmount` int NOT NULL COMMENT '罰金金額',
  `CompletionTime` timestamp NULL DEFAULT NULL COMMENT '處理完成時間',
  `NotificationStatus` tinyint(1) NOT NULL COMMENT '是否通知車主',
  `LicensePlate` varchar(20) DEFAULT NULL,
  `CaptureTime` datetime DEFAULT NULL,
  `CaptureLocation` text,
  PRIMARY KEY (`TicketID`),
  KEY `FK_TicketInfo_EventBasicInfo` (`ViolationID`),
  CONSTRAINT `FK_TicketInfo_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='罰單資料表，用於記錄違規處理後產生的罰單信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketinfo`
--

LOCK TABLES `ticketinfo` WRITE;
/*!40000 ALTER TABLE `ticketinfo` DISABLE KEYS */;
INSERT INTO `ticketinfo` VALUES (8,9,1200,'2025-01-09 01:12:39',0,NULL,NULL,NULL),(9,10,1200,'2025-01-09 01:35:52',0,NULL,NULL,NULL),(10,11,1200,'2025-01-09 01:51:09',0,NULL,NULL,NULL),(11,12,1200,'2025-01-09 02:06:04',0,NULL,NULL,NULL),(12,13,1200,'2025-01-09 02:17:55',0,NULL,NULL,NULL),(13,14,1200,'2025-01-09 05:11:30',0,NULL,NULL,NULL),(14,15,1200,'2025-01-09 05:33:31',0,NULL,NULL,NULL),(15,16,1200,'2025-01-09 05:59:23',0,NULL,NULL,NULL),(16,17,1200,'2025-01-09 06:37:47',0,NULL,NULL,NULL),(17,18,1200,'2025-01-09 06:44:02',0,NULL,NULL,NULL),(18,19,1200,'2025-01-09 17:27:36',0,NULL,NULL,NULL),(19,20,1200,'2025-01-09 17:39:57',0,NULL,NULL,NULL),(20,21,1200,'2025-01-09 17:53:29',0,NULL,NULL,NULL),(21,22,1200,'2025-01-09 18:18:27',0,NULL,NULL,NULL),(22,23,1200,'2025-01-09 18:27:29',0,NULL,NULL,NULL),(23,24,1200,'2025-01-09 18:44:30',0,NULL,NULL,NULL),(24,25,1200,'2025-01-09 19:18:36',0,NULL,NULL,NULL),(25,26,1200,'2025-01-09 21:45:11',0,NULL,NULL,NULL),(26,27,1200,'2025-01-09 21:49:01',0,NULL,NULL,NULL),(27,28,1200,'2025-01-09 21:52:54',0,NULL,NULL,NULL),(28,29,1200,'2025-01-09 22:12:10',0,NULL,NULL,NULL),(29,30,1200,'2025-01-09 22:41:21',0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `ticketinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicleinfo`
--

DROP TABLE IF EXISTS `vehicleinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicleinfo` (
  `ViolationID` int NOT NULL,
  `LicensePlate` char(10) DEFAULT NULL COMMENT '車牌號碼',
  `VehicleType` char(20) DEFAULT NULL COMMENT '車型',
  `VehicleColor` char(20) DEFAULT NULL COMMENT '車輛顏色',
  `RegistrationStatus` tinyint(1) DEFAULT NULL COMMENT '車籍資料匹配確認狀態',
  `VehicleRegisterName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ViolationID`),
  CONSTRAINT `FK_VehicleInfo_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='車輛資料表，存儲與違規車輛相關的信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicleinfo`
--

LOCK TABLES `vehicleinfo` WRITE;
/*!40000 ALTER TABLE `vehicleinfo` DISABLE KEYS */;
INSERT INTO `vehicleinfo` VALUES (1,'0852UH','Toyota Vios','黑色',1,'張三'),(2,'7336GN','Mazda Tribute','銀色',1,'李四'),(3,'YP8549','卡車','白色',1,'王五'),(4,'225373','Toyota Camry','銀色',1,'劉六'),(5,'AQA2635','休旅車','白色',1,'老吳'),(6,'829MGE','機車','黑色',1,'劉三');
/*!40000 ALTER TABLE `vehicleinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `violationinfo`
--

DROP TABLE IF EXISTS `violationinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `violationinfo` (
  `ViolationID` int NOT NULL,
  `RoadType` char(10) DEFAULT NULL COMMENT '道路類型（一般道路或高速公路）',
  `ViolationType` char(50) DEFAULT NULL COMMENT '違規類型，例如超速',
  `SpeedLimit` int DEFAULT NULL COMMENT '道路速限 (km/h)',
  `VehicleSpeed` int DEFAULT NULL COMMENT '車速 (km/h)',
  PRIMARY KEY (`ViolationID`),
  CONSTRAINT `FK_ViolationInfo_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='實際違規相關資訊表，記錄違規細節';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `violationinfo`
--

LOCK TABLES `violationinfo` WRITE;
/*!40000 ALTER TABLE `violationinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `violationinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-10 15:15:36
