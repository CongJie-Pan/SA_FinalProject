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
INSERT INTO `airecognition` VALUES (2,'AXN',NULL,NULL,NULL,NULL),(3,'0852-UH',NULL,NULL,NULL,NULL),(4,'7336-GN',NULL,NULL,NULL,NULL),(5,'YP-8549',NULL,NULL,NULL,NULL),(6,'225373',NULL,NULL,NULL,NULL),(7,'0852-UH',NULL,NULL,NULL,NULL),(8,'0852-UH',NULL,NULL,NULL,NULL),(10,'AXN',NULL,NULL,NULL,NULL),(18,'0852-UH',NULL,NULL,'0852-UH',NULL),(19,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(24,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(25,'0852-UH',NULL,NULL,'0852-UH',NULL),(26,'YP-8549',NULL,NULL,'YP-8549',NULL),(27,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(29,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(30,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(31,'0852-UH',NULL,NULL,'0852-UH',NULL),(32,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(33,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(34,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(35,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(37,'TDA-6378',NULL,NULL,'TDA-6378',NULL),(38,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(39,'7336-GN',NULL,NULL,'7336-GN',NULL),(40,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(41,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(44,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(47,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(48,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(50,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(51,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(52,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(53,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(54,'0852-UH',NULL,NULL,'0852-UH',NULL),(55,'YP-8549',NULL,NULL,'YP-8549',NULL),(57,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(58,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(60,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(61,'7336-GN',NULL,NULL,'7336-GN',NULL),(62,'0852-UH',NULL,NULL,'0852-UH',NULL),(63,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(64,'TDA-6378',NULL,NULL,'TDA-6378',NULL),(65,'0852-UH',NULL,NULL,'0852-UH',NULL),(67,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(68,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(69,'YP-8549',NULL,NULL,'YP-8549',NULL),(70,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(72,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(73,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(75,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(77,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(78,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(79,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(80,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(81,'9536-ND',NULL,NULL,'9536-ND',NULL),(82,'C536ND',NULL,NULL,'C536ND',NULL),(83,'NaN',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(84,'C530 ND',NULL,NULL,'C530 ND',NULL),(87,'AQA-2835',NULL,NULL,'AQA-2835',NULL),(88,'未偵測到車牌號碼',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(89,'C506ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(90,'AQA-2635',NULL,NULL,'AQA-2635',NULL),(92,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(93,'TDA-6378',NULL,NULL,'TDA-6378',NULL),(94,'C503N7',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(95,'AQA-2635',NULL,NULL,'AQA-2635',NULL),(96,'AQA-2635',NULL,NULL,'AQA-2635',NULL),(97,'無法辨識車牌號碼',NULL,NULL,'MANUAL_REVIEW','模糊或者有雙重車牌無法順利辨識'),(99,'0852-UH',NULL,NULL,'0852-UH',NULL),(100,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(101,'C5505ND',NULL,NULL,'MANUAL_REVIEW','模糊或者有雙重車牌無法順利辨識'),(102,'無法辨識',NULL,NULL,'MANUAL_REVIEW','模糊或者有雙重車牌無法順利辨識'),(103,'C503-ND',NULL,NULL,'MANUAL_REVIEW','模糊或者有雙重車牌無法順利辨識'),(104,'C596-ND',NULL,NULL,'MANUAL_REVIEW','模糊或者有雙重車牌無法順利辨識'),(105,'C506ND',NULL,NULL,'MANUAL_REVIEW','模糊或者有雙重車牌無法順利辨識'),(106,'C509ND',NULL,NULL,'MANUAL_REVIEW','模糊或者有雙重車牌無法順利辨識'),(108,'0852-UH',NULL,NULL,'0852-UH',NULL),(109,'0852-UH',NULL,NULL,'0852-UH',NULL),(110,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(111,'C503ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(112,'AQA-2635',NULL,NULL,'AQA-2635',NULL),(114,'C506ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(115,'0852-UH',NULL,NULL,'0852-UH',NULL),(116,'0852-UH',NULL,NULL,'0852-UH',NULL),(117,'0852-UH',NULL,NULL,'0852-UH',NULL),(118,'C556-ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(120,'C509-ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(121,'0852-UH',NULL,NULL,'0852-UH',NULL),(122,'0852-UH',NULL,NULL,'0852-UH',NULL),(123,'0852-UH',NULL,NULL,'0852-UH',NULL),(124,'0852-UH',NULL,NULL,'0852-UH',NULL),(125,'7336-GN',NULL,NULL,'7336-GN',NULL),(126,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(127,'C500ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(134,'0852-UH',NULL,NULL,'0852-UH',NULL),(135,'0852-UH',NULL,NULL,'0852-UH',NULL),(136,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(137,'C563 ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(138,'0852-UH',NULL,NULL,'0852-UH',NULL),(139,'2863-JQ',NULL,NULL,'2863-JQ',NULL),(140,'C509-ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(141,'AQA-2635',NULL,NULL,'AQA-2635',NULL),(143,'AQA2635',NULL,NULL,'AQA2635',NULL),(144,'AGA2635',NULL,NULL,'AGA2635',NULL),(145,'AQA2635',NULL,NULL,'AQA2635',NULL),(146,'0852UH',NULL,NULL,'0852UH',NULL),(147,'0852UH',NULL,NULL,'0852UH',NULL),(150,'C509ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(152,'偵測到的車牌號碼',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(153,'AQA2635',NULL,NULL,'AQA2635',NULL),(154,'AQA2635',NULL,NULL,'AQA2635',NULL),(155,'AQA2635',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(156,'0852UH',NULL,NULL,'0852UH',NULL),(157,'0852UH',NULL,NULL,'0852UH',NULL),(158,'0852UH',NULL,NULL,'0852UH',NULL),(159,'225373',NULL,NULL,'225373',NULL),(161,'AQA2635',NULL,NULL,'AQA2635',NULL),(162,'C509ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(163,'C505ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(164,'C506ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(165,'C506ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(166,'C550GND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(167,'C506ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(168,'C506ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(169,'C503ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(171,'AQA2635',NULL,NULL,'AQA2635',NULL),(172,'C530ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(173,'CS53ND',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(174,'829MGE',NULL,NULL,'829MGE',NULL),(175,'829MGE',NULL,NULL,'MANUAL_REVIEW','需要人工審核'),(176,'0852UH',NULL,NULL,'0852UH',NULL),(177,'0852UH',NULL,NULL,'0852UH',NULL),(178,'0852UH',NULL,NULL,'0852UH',NULL),(179,'AQA2635',NULL,NULL,'AQA2635',NULL),(181,'829MGE',NULL,NULL,'829MGE',NULL),(182,'AQA2635',NULL,NULL,'AQA2635',NULL),(183,'0852UH',NULL,NULL,'0852UH',NULL),(184,'0852UH',NULL,NULL,'0852UH',NULL),(185,'0852UH',NULL,NULL,'0852UH',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='事件基本資料表，用於存儲拍攝當下的核心信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventbasicinfo`
--

LOCK TABLES `eventbasicinfo` WRITE;
/*!40000 ALTER TABLE `eventbasicinfo` DISABLE KEYS */;
INSERT INTO `eventbasicinfo` VALUES (1,'300','2024-12-28 08:36:00','中北路'),(2,'300','2024-12-28 08:36:00','中北路'),(3,'300','2024-12-28 08:36:00','中北路'),(4,'300','2024-12-28 08:36:00','中北路'),(5,'300','2024-12-28 08:36:00','中北路'),(6,'300','2024-12-28 08:36:00','中北路'),(7,'300','2024-12-28 08:52:00','中北路'),(8,'300','2024-12-28 10:57:00','中北路'),(9,'300','2024-12-28 10:57:00','中北路'),(10,'300','2024-12-28 10:57:00','中北路'),(11,'300','2024-12-28 11:16:00','中北路'),(12,'300','2024-12-28 11:16:00','中北路'),(13,'300','2024-12-28 11:19:00','中北路'),(14,'300','2024-12-28 11:20:00','中北路'),(15,'300','2024-12-28 11:23:00','中北路'),(16,'300','2024-12-28 11:24:00','中興路'),(17,'300','2024-12-28 11:26:00','中北路'),(18,'300','2024-12-28 11:30:00','中北路'),(19,'300','2024-12-28 11:30:00','中北路'),(20,'300','2024-12-28 11:30:00','中北路'),(21,'300','2024-12-28 11:30:00','中北路'),(22,'300','2024-12-28 11:30:00','中北路'),(23,'300','2024-12-28 11:34:00','中北路'),(24,'300','2024-12-28 11:40:00','中北路'),(25,'300','2024-12-28 11:41:00','中北路'),(26,'300','2024-12-28 11:41:00','中北路'),(27,'300','2024-12-28 11:41:00','中北路'),(28,'300','2024-12-28 11:41:00','中北路'),(29,'300','2024-12-28 11:41:00','中北路'),(30,'300','2024-12-28 11:49:00','中北路'),(31,'300','2024-12-28 11:50:00','中北路'),(32,'300','2024-12-28 11:50:00','中北路'),(33,'300','2024-12-28 11:51:00','中北路'),(34,'300','2024-12-28 11:56:00','中北路'),(35,'300','2024-12-28 11:56:00','中北路'),(36,'300','2024-12-28 11:56:00','中北路'),(37,'300','2024-12-28 11:56:00','中北路'),(38,'300','2024-12-28 11:56:00','中北路'),(39,'300','2024-12-28 11:56:00','中北路'),(40,'300','2024-12-28 11:56:00','中北路'),(41,'300','2024-12-28 11:56:00','中北路'),(42,'300','2024-12-28 11:56:00','中北路'),(43,'300','2024-12-28 12:01:00','中北路'),(44,'300','2024-12-28 12:01:00','中北路'),(45,'300','2024-12-28 12:01:00','中北路'),(46,'300','2024-12-28 12:08:00','中北路'),(47,'300','2024-12-28 12:08:00','中北路'),(48,'300','2024-12-28 12:19:00','中北路'),(49,'300','2024-12-28 12:19:00','中北路'),(50,'300','2024-12-28 12:19:00','中北路'),(51,'300','2024-12-28 12:19:00','中北路'),(52,'300','2024-12-28 12:45:00','中北路'),(53,'300','2024-12-28 12:45:00','中北路'),(54,'300','2024-12-28 12:45:00','中北路'),(55,'300','2024-12-28 12:45:00','中北路'),(56,'300','2024-12-28 12:45:00','中北路'),(57,'300','2024-12-28 12:49:00','中北路'),(58,'300','2024-12-28 12:52:00','中北路'),(59,'300','2024-12-28 12:52:00','中北路'),(60,'300','2024-12-28 12:52:00','中北路'),(61,'300','2024-12-28 12:52:00','中北路'),(62,'300','2024-12-28 12:58:00','中北路'),(63,'300','2024-12-28 12:58:00','中北路'),(64,'300','2024-12-28 13:00:00','中北路'),(65,'300','2024-12-28 13:00:00','中北路'),(66,'300','2024-12-28 13:00:00','中北路'),(67,'300','2024-12-28 13:01:00','中北路'),(68,'300','2024-12-28 13:20:00','中北路'),(69,'300','2024-12-29 07:42:00','中北路'),(70,'300','2024-12-29 07:42:00','中北路'),(71,'300','2024-12-29 07:42:00','中北路'),(72,'300','2024-12-29 07:42:00','中北路'),(73,'300','2024-12-29 08:17:00','中北路'),(74,'300','2024-12-29 08:17:00','中北路'),(75,'300','2024-12-29 08:18:00','中北路'),(76,'300','2024-12-29 08:18:00','中北路'),(77,'300','2024-12-29 08:18:00','中北路'),(78,'300','2024-12-29 08:18:00','中北路'),(79,'300','2024-12-29 08:18:00','中北路'),(80,'300','2024-12-29 08:18:00','中北路'),(81,'300','2024-12-29 08:18:00','中北路'),(82,'300','2024-12-29 08:18:00','中北路'),(83,'300','2024-12-29 08:18:00','中北路'),(84,'300','2024-12-29 08:18:00','中北路'),(85,'300','2024-12-29 08:18:00','中北路'),(86,'300','2024-12-29 08:18:00','中北路'),(87,'300','2024-12-29 08:30:00','中北路'),(88,'300','2024-12-29 08:44:00','中北路'),(89,'300','2024-12-29 08:44:00','中北路'),(90,'300','2024-12-29 08:44:00','中北路'),(91,'300','2024-12-29 08:44:00','中北路'),(92,'300','2024-12-29 08:44:00','中北路'),(93,'300','2024-12-29 08:44:00','中北路'),(94,'300','2024-12-29 08:44:00','中北路'),(95,'300','2024-12-29 08:44:00','中北路'),(96,'300','2024-12-30 06:25:00','中北路'),(97,'300','2024-12-30 06:25:00','中北路'),(98,'300','2024-12-30 06:25:00','中北路'),(99,'300','2024-12-30 06:27:00','中北路'),(100,'300','2024-12-30 06:27:00','中北路'),(101,'300','2024-12-30 06:27:00','中北路'),(102,'300','2024-12-30 06:36:00','中北路'),(103,'300','2024-12-30 06:41:00','中北路'),(104,'300','2024-12-30 06:46:00','中北路'),(105,'300','2024-12-30 06:50:00','中北路'),(106,'300','2024-12-30 06:56:00','中北路'),(107,'300','2024-12-30 06:56:00','中北路'),(108,'300','2024-12-30 06:56:00','中北路'),(109,'300','2024-12-30 14:46:00','中北路'),(110,'300','2024-12-30 14:46:00','中北路'),(111,'300','2024-12-30 14:46:00','中北路'),(112,'300','2024-12-30 14:46:00','中北路'),(113,'300','2024-12-30 14:46:00','中北路'),(114,'300','2024-12-30 15:04:00','中北路'),(115,'300','2024-12-30 15:04:00','中北路'),(116,'300','2024-12-30 15:07:00','中北路'),(117,'300','2024-12-30 15:08:00','中北路'),(118,'300','2024-12-30 15:08:00','中北路'),(119,'300','2024-12-30 15:24:00','中北路'),(120,'300','2024-12-30 15:25:00','中北路'),(121,'300','2024-12-30 15:25:00','中北路'),(122,'300','2024-12-30 15:31:00','中北路'),(123,'300','2024-12-30 15:53:00','中北路'),(124,'300','2024-12-30 15:55:00','中北路'),(125,'300','2024-12-30 15:55:00','中北路'),(126,'300','2024-12-30 15:59:00','中興路'),(127,'300','2024-12-30 15:59:00','中興路'),(128,'300','2024-12-30 15:59:00','中興路'),(129,'300','2024-12-30 15:59:00','中興路'),(130,'300','2024-12-30 15:59:00','中興路'),(131,'300','2024-12-30 15:59:00','中興路'),(132,'300','2024-12-30 16:03:00','中北路'),(133,'300','2024-12-30 16:03:00','中北路'),(134,'300','2024-12-30 16:03:00','中北路'),(135,'300','2024-12-30 16:18:00','中興路'),(136,'300','2024-12-30 16:18:00','中興路'),(137,'300','2024-12-30 16:18:00','中興路'),(138,'300','2024-12-31 02:18:00','中北路'),(139,'300','2024-12-31 02:18:00','中北路'),(140,'300','2024-12-31 02:18:00','中北路'),(141,'300','2024-12-31 02:18:00','中北路'),(142,'300','2024-12-31 02:18:00','中北路'),(143,'300','2024-12-31 02:29:00','中北路'),(144,'300','2024-12-31 02:32:00','中北路'),(145,'300','2024-12-31 02:32:00','中北路'),(146,'300','2024-12-31 02:32:00','中北路'),(147,'300','2024-12-31 02:35:00','中北路'),(148,'300','2024-12-31 02:35:00','中北路'),(149,'300','2024-12-31 02:35:00','中北路'),(150,'300','2024-12-31 02:35:00','中北路'),(151,'300','2024-12-31 02:35:00','中北路'),(152,'300','2024-12-31 02:35:00','中北路'),(153,'300','2024-12-31 02:35:00','中北路'),(154,'300','2024-12-31 02:42:00','中北路'),(155,'300','2024-12-31 02:46:00','中北路'),(156,'300','2024-12-31 02:46:00','中北路'),(157,'300','2024-12-31 02:49:00','中北路'),(158,'300','2024-12-31 02:54:00','中北路'),(159,'300','2024-12-31 02:54:00','中北路'),(160,'300','2024-12-31 02:54:00','中北路'),(161,'300','2024-12-31 02:54:00','中北路'),(162,'300','2024-12-31 02:54:00','中北路'),(163,'300','2024-12-31 02:54:00','中北路'),(164,'300','2024-12-31 02:54:00','中北路'),(165,'300','2024-12-31 02:54:00','中北路'),(166,'300','2024-12-31 02:54:00','中北路'),(167,'300','2024-12-31 02:54:00','中北路'),(168,'300','2024-12-31 02:54:00','中北路'),(169,'300','2024-12-31 02:54:00','中北路'),(170,'300','2024-12-31 02:54:00','中北路'),(171,'300','2024-12-31 02:54:00','中北路'),(172,'300','2024-12-31 02:54:00','中北路'),(173,'300','2024-12-31 02:54:00','中北路'),(174,'300','2024-12-31 02:54:00','中北路'),(175,'300','2024-12-31 02:54:00','中北路'),(176,'300','2024-12-31 03:39:00','中北路'),(177,'300','2024-12-31 03:40:00','中北路'),(178,'300','2024-12-31 03:41:00','中北路'),(179,'300','2024-12-31 03:41:00','中北路'),(180,'300','2024-12-31 03:41:00','中北路'),(181,'300','2024-12-31 03:41:00','中北路'),(182,'300','2024-12-31 03:46:00','中北路'),(183,'300','2024-12-31 03:54:00','中北路'),(184,'300','2024-12-31 03:59:00','中北路'),(185,'300','2024-12-31 04:05:00','中北路');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='處理誌表，用於存儲每次處理的詳細記錄';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processinglog`
--

LOCK TABLES `processinglog` WRITE;
/*!40000 ALTER TABLE `processinglog` DISABLE KEYS */;
INSERT INTO `processinglog` VALUES (4,117,'00','System','2024-12-30 23:09:00','罰單生成完成'),(5,122,'00','System','2024-12-30 23:31:57','罰單生成完成'),(6,122,'00','System','2024-12-30 23:33:07','罰單生成完成'),(7,123,'00','System','2024-12-30 23:53:30','罰單生成完成'),(8,124,'00','System','2024-12-30 23:55:56','罰單生成完成'),(9,125,'00','System','2024-12-30 23:56:59','罰單生成完成'),(10,125,'00','System','2024-12-30 23:58:33','罰單生成完成'),(11,134,'00','System','2024-12-31 00:15:33','罰單生成完成'),(12,135,'00','System','2024-12-31 00:19:40','罰單生成完成'),(13,138,'00','System','2024-12-31 10:19:19','罰單生成完成'),(14,153,'00','System','2024-12-31 10:38:26','罰單生成完成'),(15,154,'00','System','2024-12-31 10:42:43','罰單生成完成'),(16,156,'00','System','2024-12-31 10:46:54','罰單生成完成'),(17,157,'00','System','2024-12-31 10:49:41','罰單生成完成'),(18,158,'00','System','2024-12-31 10:54:45','罰單生成完成'),(19,159,'00','System','2024-12-31 11:06:04','罰單生成完成'),(20,159,'00','System','2024-12-31 11:06:18','罰單生成完成'),(21,161,'00','System','2024-12-31 11:08:22','罰單生成完成'),(22,184,'00','System','2024-12-31 11:59:15','罰單生成完成'),(23,185,'00','System','2024-12-31 12:05:43','罰單生成完成'),(24,185,'00','System','2024-12-31 12:06:04','罰單生成完成');
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
  PRIMARY KEY (`TicketID`),
  KEY `FK_TicketInfo_EventBasicInfo` (`ViolationID`),
  CONSTRAINT `FK_TicketInfo_EventBasicInfo` FOREIGN KEY (`ViolationID`) REFERENCES `eventbasicinfo` (`ViolationID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='罰單資料表，用於記錄違規處理後產生的罰單信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketinfo`
--

LOCK TABLES `ticketinfo` WRITE;
/*!40000 ALTER TABLE `ticketinfo` DISABLE KEYS */;
INSERT INTO `ticketinfo` VALUES (4,117,1200,'2024-12-30 07:09:00',0),(5,122,1200,'2024-12-30 07:31:57',0),(6,122,1200,'2024-12-30 07:33:07',0),(7,123,1200,'2024-12-30 07:53:30',0),(8,124,1200,'2024-12-30 07:55:56',0),(9,125,1200,'2024-12-30 07:56:59',0),(10,125,1200,'2024-12-30 07:58:33',0),(11,134,1200,'2024-12-30 08:15:33',0),(12,135,1200,'2024-12-30 08:19:40',0),(13,138,1200,'2024-12-30 18:19:19',0),(14,153,1200,'2024-12-30 18:38:26',0),(15,154,1200,'2024-12-30 18:42:43',0),(16,156,1200,'2024-12-30 10:46:54',0),(17,157,1200,'2024-12-30 10:49:41',0),(18,158,1200,'2024-12-30 10:54:45',0),(19,159,1200,'2024-12-30 11:06:04',0),(20,159,1200,'2024-12-30 11:06:18',0),(21,161,1200,'2024-12-30 11:08:22',0),(22,184,1200,'2024-12-30 11:59:14',0),(23,185,1200,'2024-12-30 20:05:43',0),(24,185,1200,'2024-12-30 20:06:04',0);
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

-- Dump completed on 2024-12-31 12:10:15
