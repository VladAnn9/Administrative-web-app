-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: early-stage
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dokumenty_n`
--

DROP TABLE IF EXISTS `dokumenty_n`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dokumenty_n` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `uzytkownik_id` int(11) NOT NULL,
  `rodzaj_dok` enum('Z','WZ','PZ','I','ZN') COLLATE utf8_polish_ci NOT NULL,
  `status` enum('edycja','gotowy','zrobione wz','anulowany') COLLATE utf8_polish_ci DEFAULT NULL,
  `mnoznik` tinyint(1) DEFAULT NULL,
  `aktywny` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uzytkownik_id_idx` (`uzytkownik_id`),
  CONSTRAINT `uzytkownik_id` FOREIGN KEY (`uzytkownik_id`) REFERENCES `uzytkownicy` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokumenty_n`
--

LOCK TABLES `dokumenty_n` WRITE;
/*!40000 ALTER TABLE `dokumenty_n` DISABLE KEYS */;
INSERT INTO `dokumenty_n` VALUES (1,'0001-06-19',1,'WZ','edycja',-1,NULL),(2,'0001-06-19',1,'I','edycja',1,NULL),(3,'0003-06-19',1,'WZ','edycja',-1,NULL),(13,'0003-06-19',1,'WZ','edycja',-1,NULL),(14,'0003-06-19',1,'WZ','edycja',-1,NULL),(15,'0003-06-19',1,'PZ','edycja',1,NULL),(16,'0003-06-19',1,'PZ','edycja',1,NULL),(17,'0003-06-19',1,'PZ','edycja',1,NULL),(18,'0003-06-19',1,'PZ','edycja',1,NULL),(19,'0003-06-19',1,'PZ','edycja',1,NULL),(20,'0003-06-19',1,'PZ','edycja',1,NULL),(21,'0003-06-19',1,'PZ','edycja',1,NULL),(22,'0003-06-19',1,'PZ','edycja',1,NULL),(23,'0003-06-19',1,'PZ','gotowy',1,NULL),(24,'0003-06-19',1,'PZ','edycja',1,NULL),(25,'0003-06-19',1,'PZ','edycja',1,NULL),(26,'0003-06-19',1,'PZ','edycja',1,NULL),(27,'0003-06-19',1,'PZ','edycja',1,NULL),(28,'0003-06-19',1,'PZ','edycja',1,NULL),(29,'0003-06-19',1,'PZ','edycja',1,NULL),(30,'0003-06-19',1,'PZ','edycja',1,NULL),(31,'0003-06-19',1,'PZ','edycja',1,NULL),(32,'0003-06-19',1,'PZ','edycja',1,NULL),(34,'0003-06-19',1,'Z','anulowany',-1,NULL),(35,'0004-06-19',1,'PZ','edycja',1,NULL),(36,'0004-06-19',1,'PZ','gotowy',1,NULL),(37,'0007-06-19',1,'Z','anulowany',-1,NULL),(38,'0007-06-19',1,'Z','edycja',-1,NULL),(39,'0007-06-19',1,'WZ','edycja',-1,NULL),(40,'0007-06-19',1,'WZ','edycja',-1,NULL),(41,'0007-06-19',1,'WZ','edycja',-1,NULL),(42,'0007-06-19',1,'WZ','edycja',-1,NULL),(43,'0007-06-19',1,'WZ','edycja',-1,NULL),(44,'0007-06-19',1,'Z','edycja',-1,NULL),(45,'0007-06-19',1,'Z','edycja',-1,NULL),(46,'0007-06-19',1,'Z','edycja',-1,NULL),(47,'0007-06-19',1,'Z','edycja',-1,NULL),(48,'0007-06-19',1,'Z','edycja',-1,NULL),(49,'0007-06-19',1,'Z','edycja',-1,NULL),(50,'0007-06-19',1,'PZ','edycja',1,NULL),(51,'0007-06-19',1,'Z','edycja',-1,NULL),(52,'0007-06-19',1,'Z','edycja',-1,NULL),(53,'0007-06-19',1,'Z','edycja',-1,NULL),(54,'0007-06-19',1,'Z','edycja',-1,NULL),(55,'0007-06-19',1,'Z','edycja',-1,NULL),(56,'0007-06-19',1,'Z','edycja',-1,NULL),(57,'0007-06-19',1,'Z','edycja',-1,NULL),(58,'0007-06-19',1,'Z','edycja',-1,NULL),(59,'0007-06-19',1,'Z','edycja',-1,NULL),(60,'0007-06-19',1,'Z','edycja',-1,NULL),(61,'0007-06-19',1,'Z','edycja',-1,NULL),(62,'0007-06-19',1,'Z','edycja',-1,NULL),(63,'0007-06-19',1,'Z','edycja',-1,NULL),(64,'0007-06-19',1,'Z','edycja',-1,NULL),(65,'0007-06-19',1,'Z','edycja',-1,NULL),(66,'0007-06-19',1,'Z','edycja',-1,NULL),(67,'0007-06-19',1,'Z','edycja',-1,NULL),(68,'0007-06-19',1,'Z','edycja',-1,NULL),(69,'0007-06-19',1,'PZ','edycja',1,NULL),(70,'0007-06-19',1,'WZ','edycja',-1,NULL),(71,'0007-06-19',1,'I','edycja',1,NULL),(72,'0007-06-19',1,'PZ','gotowy',1,NULL),(73,'0007-06-19',1,'Z','edycja',-1,NULL),(74,'0008-06-19',1,'ZN','edycja',-1,NULL),(75,'0008-06-19',1,'ZN','edycja',-1,NULL),(76,'0008-06-19',1,'PZ','gotowy',1,NULL),(77,'0008-06-19',1,'I','edycja',1,NULL),(78,'0008-06-19',1,'WZ','edycja',-1,NULL),(79,'0008-06-19',1,'WZ','edycja',-1,NULL),(80,'0008-06-19',1,'WZ','edycja',-1,NULL),(81,'0008-06-19',1,'WZ','edycja',-1,NULL),(82,'0008-06-19',1,'WZ','edycja',-1,NULL),(83,'0008-06-19',1,'I','edycja',1,NULL),(84,'0008-06-19',1,'I','edycja',1,NULL),(85,'0008-06-19',1,'I','edycja',1,NULL),(86,'0008-06-19',1,'I','edycja',1,NULL),(87,'0008-06-19',1,'I','edycja',1,NULL),(88,'0008-06-19',1,'I','edycja',1,NULL),(89,'0008-06-19',1,'I','edycja',1,NULL),(90,'0008-06-19',1,'WZ','edycja',-1,NULL),(91,'0008-06-19',1,'I','edycja',1,NULL),(92,'0009-06-19',1,'WZ','edycja',-1,NULL),(93,'0009-06-19',1,'I','gotowy',1,NULL),(94,'0009-06-19',1,'Z','gotowy',-1,NULL),(95,'0009-06-19',1,'WZ','edycja',-1,NULL),(96,'0009-06-19',1,'PZ','gotowy',1,NULL),(97,'0009-06-19',1,'PZ','gotowy',1,NULL),(98,'0009-06-19',1,'I','edycja',1,NULL),(99,'0009-06-19',1,'I','gotowy',1,NULL),(100,'0009-06-19',1,'I','edycja',1,NULL),(101,'0009-06-19',1,'I','gotowy',1,NULL),(102,'0009-06-19',4,'I','gotowy',1,NULL),(103,'2012-06-19',1,'PZ','gotowy',1,NULL),(104,'2012-06-19',1,'PZ','gotowy',1,NULL),(105,'2012-06-19',1,'Z','gotowy',-1,NULL),(106,'2012-06-19',1,'Z','gotowy',-1,NULL),(107,'2012-06-19',1,'Z','gotowy',0,NULL),(108,'2013-06-19',1,'WZ','gotowy',-1,NULL),(109,'2019-06-13',1,'Z','gotowy',0,NULL),(110,'2019-06-13',1,'PZ','gotowy',1,NULL),(111,'2019-06-13',2,'WZ','edycja',-1,NULL),(112,'2019-06-13',1,'WZ','edycja',-1,NULL),(113,'2019-06-13',1,'WZ','edycja',-1,NULL),(114,'2019-06-13',1,'WZ','edycja',-1,NULL),(115,'2019-06-13',1,'WZ','edycja',-1,NULL),(116,'2019-06-13',1,'WZ','edycja',-1,NULL),(117,'2019-06-13',1,'Z','gotowy',0,NULL),(118,'2019-06-13',1,'WZ','edycja',-1,NULL),(119,'2019-06-13',1,'WZ','edycja',-1,NULL),(120,'2019-06-13',1,'Z','gotowy',0,NULL),(121,'2019-06-14',1,'WZ','edycja',-1,NULL),(122,'2019-06-14',1,'WZ','edycja',-1,NULL),(123,'2019-06-14',2,'Z','gotowy',0,NULL),(124,'2019-06-14',3,'Z','zrobione wz',0,NULL),(125,'2019-06-14',3,'WZ','gotowy',-1,NULL),(126,'2019-06-15',1,'Z','zrobione wz',0,NULL),(127,'2019-06-15',1,'Z','edycja',0,NULL),(128,'2019-06-15',1,'WZ','edycja',-1,NULL),(129,'2019-06-15',1,'PZ','gotowy',1,NULL),(130,'2019-06-15',1,'PZ','gotowy',1,NULL),(131,'2019-06-16',1,'PZ','gotowy',1,NULL),(133,'2019-06-16',3,'WZ',NULL,-1,NULL),(134,'2019-06-16',3,'I','gotowy',1,NULL),(135,'2019-06-16',3,'I','gotowy',1,NULL),(136,'2019-06-16',3,'I','gotowy',1,NULL),(138,'2019-06-16',3,'Z','gotowy',0,NULL),(139,'2019-06-16',3,'Z','gotowy',0,NULL),(140,'2019-06-16',3,'I','gotowy',1,NULL),(141,'2019-06-13',2,'WZ','edycja',-1,NULL),(142,'2019-06-17',3,'WZ',NULL,-1,NULL),(144,'2019-06-17',1,'WZ','edycja',-1,NULL),(145,'2019-06-17',1,'WZ','gotowy',-1,NULL),(146,'2019-06-17',1,'WZ','edycja',-1,NULL),(147,'2019-06-17',3,'WZ','gotowy',-1,NULL),(148,'2019-06-17',1,'WZ','edycja',-1,NULL),(149,'2019-06-17',1,'WZ','edycja',-1,NULL),(150,'2019-06-17',1,'WZ','edycja',-1,NULL),(151,'2019-06-17',1,'WZ','edycja',-1,NULL),(152,'2019-06-17',1,'WZ','edycja',-1,NULL),(153,'2019-06-17',1,'WZ','edycja',-1,NULL),(154,'2019-06-18',3,'Z','gotowy',0,NULL),(155,'2019-06-18',3,'Z','gotowy',0,NULL),(156,'2019-06-18',3,'Z','gotowy',0,NULL),(157,'2019-06-18',3,'Z','gotowy',0,NULL),(159,'2019-06-18',3,'WZ','gotowy',-1,NULL),(160,'2019-06-18',3,'ZN','gotowy',-1,NULL),(161,'2019-06-18',3,'ZN','gotowy',-1,NULL),(162,'2019-06-18',3,'ZN','gotowy',-1,NULL),(163,'2019-06-18',1,'PZ','gotowy',1,NULL),(164,'2019-06-19',1,'Z','anulowany',0,NULL),(165,'2019-06-19',1,'WZ','gotowy',-1,NULL),(167,'2019-06-19',3,'Z','zrobione wz',0,NULL),(168,'2019-06-19',3,'WZ','gotowy',-1,NULL),(169,'2019-06-19',3,'WZ','gotowy',-1,NULL),(171,'2019-06-24',1,'WZ','gotowy',-1,NULL),(172,'2019-06-24',3,'Z','anulowany',0,NULL),(176,'2019-06-25',9,'WZ','anulowany',-1,NULL),(177,'2019-06-25',1,'WZ','edycja',-1,NULL),(178,'2019-06-29',1,'WZ','gotowy',-1,NULL),(179,'2019-06-29',3,'Z','zrobione wz',0,NULL),(180,'2019-06-29',3,'WZ','gotowy',-1,NULL),(181,'2019-06-29',3,'Z','anulowany',0,NULL),(182,'2019-06-29',3,'WZ','edycja',-1,NULL),(184,'2019-06-29',1,'WZ','edycja',-1,NULL),(189,'2019-07-03',3,'Z','zrobione wz',0,NULL),(190,'2019-07-03',3,'ZN','edycja',-1,NULL),(191,'2019-07-04',1,'Z','edycja',0,NULL),(192,'2019-07-05',3,'WZ','edycja',-1,NULL),(195,'2019-07-05',1,'Z','gotowy',0,NULL),(197,'2019-07-09',3,'Z','gotowy',0,NULL),(198,'2019-07-09',1,'I','edycja',1,NULL),(199,'2019-07-09',1,'PZ','gotowy',1,NULL),(200,'2019-07-11',1,'PZ','edycja',1,NULL);
/*!40000 ALTER TABLE `dokumenty_n` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dokumenty_p`
--

DROP TABLE IF EXISTS `dokumenty_p`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `dokumenty_p` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `materialy_id` int(11) NOT NULL,
  `ilosc` int(11) NOT NULL,
  `dok_N_id` int(11) NOT NULL,
  `stan` int(11) unsigned NOT NULL,
  `cena` decimal(8,2) DEFAULT NULL,
  `uwagi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materialy_id_idx` (`materialy_id`),
  KEY `dok_idx` (`dok_N_id`),
  CONSTRAINT `dok_N_id` FOREIGN KEY (`dok_N_id`) REFERENCES `dokumenty_n` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `materialy_id` FOREIGN KEY (`materialy_id`) REFERENCES `materialy` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=468 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokumenty_p`
--

LOCK TABLES `dokumenty_p` WRITE;
/*!40000 ALTER TABLE `dokumenty_p` DISABLE KEYS */;
INSERT INTO `dokumenty_p` VALUES (157,1,3,75,0,NULL,'fgfg'),(158,2,56,75,0,NULL,'FFF'),(159,4,5656,75,0,NULL,NULL),(160,1,1,76,0,14.24,'898'),(163,1,3,78,3,NULL,'dfdf'),(164,1,200,79,0,34.00,'LOOK'),(166,1,4,80,0,334.00,''),(169,1,44,82,44,44.00,'FFF'),(170,3,455,82,0,65.00,'fgfg'),(196,5,56,96,56,12.00,'null'),(197,5,45,97,45,5.00,'fgfg'),(211,3,34,104,45,34.00,'sdf'),(221,12,123,106,123,NULL,'sdfsdfsdf'),(222,3,334,107,34,NULL,NULL),(223,11,434,108,34,NULL,'sdf'),(225,6,34,110,334,NULL,'sdfsdf'),(226,5,3434,111,45,NULL,NULL),(227,13,43434,111,4343,NULL,NULL),(228,12,443,111,0,NULL,NULL),(229,3,5,111,0,NULL,'LOOOK'),(233,5,34,116,34,NULL,'dfdf'),(234,6,34,117,43,34.00,'asdf'),(235,5,34,117,34,34.00,NULL),(237,11,34343,117,55555,NULL,'GGGGGGGGGGGGGGGGGGGGGGGGG'),(238,6,34,118,43,34.00,'asdf'),(239,5,34,118,34,34.00,NULL),(240,1,34,118,34,34.00,NULL),(241,11,43,118,43,NULL,'dfdf'),(246,1,4444,120,344,4.00,'sadfd'),(247,11,34,120,3434,34.00,'sdfsdf'),(248,13,434,120,3434,NULL,NULL),(249,6,34,121,43,34.00,'asdf'),(250,5,34,121,34,34.00,NULL),(251,1,34,121,34,34.00,NULL),(252,11,34343,121,55555,NULL,'GGGGGGGGGGGGGGGGGGGGGGGGG'),(256,3,334,122,34,NULL,NULL),(257,12,34,123,3434,NULL,'dsfdsf'),(258,8,243,123,343,NULL,NULL),(260,2,34,123,234,NULL,NULL),(261,12,3434,124,0,3434.00,'0'),(262,12,3434,125,0,3434.00,'0'),(263,11,5654,126,56,56.00,'gfhghdf'),(264,12,1,126,56,66.00,'ghd'),(265,13,6,126,6,NULL,NULL),(266,8,655,126,5456,NULL,NULL),(268,11,3434,127,43,4.00,'f'),(270,12,1,128,56,66.00,'ghd'),(271,13,6,128,6,NULL,NULL),(272,8,655,128,5456,NULL,NULL),(276,6,5000,129,4,NULL,''),(277,11,5000,130,56,NULL,NULL),(281,1,160,133,4,NULL,'sdf'),(282,3,4,133,0,NULL,'sdf'),(285,8,34,135,43,NULL,'df'),(286,6,1,136,4,NULL,'0'),(290,6,1,140,1,NULL,'dfdf'),(291,12,3434,142,0,3434.00,'0'),(297,6,44,144,34,NULL,NULL),(298,11,3434,144,3434,NULL,'3434'),(299,12,343,144,3434,NULL,NULL),(300,8,34,144,3434,NULL,NULL),(301,3,43,144,434,NULL,'34'),(304,6,44,145,34,NULL,NULL),(305,11,3434,145,3434,NULL,'3434'),(306,12,343,145,3434,NULL,NULL),(307,8,34,145,3434,NULL,NULL),(308,3,43,145,434,NULL,'34'),(311,6,44,146,34,NULL,NULL),(312,11,3434,146,3434,NULL,'3434'),(313,12,343,146,3434,NULL,NULL),(314,8,34,146,3434,NULL,NULL),(315,3,43,146,434,NULL,'34'),(318,11,45,148,3454,NULL,'fgfg'),(319,11,45,149,3454,NULL,'fgfg'),(320,11,5654,152,56,56.00,'gfhghdf'),(321,12,1,152,56,66.00,'ghd'),(322,13,6,152,6,NULL,'null'),(323,8,655,152,5456,NULL,NULL),(327,11,5654,153,56,56.00,'gfhghdf'),(328,12,1,153,56,65.00,'ghd'),(329,13,6,153,1,NULL,'null'),(330,8,655,153,5456,NULL,NULL),(334,5,3434,154,34,NULL,'sdf'),(335,1,434,154,0,34.00,'34'),(336,6,434,155,34,34.00,'sdf'),(337,6,34,156,34,4.00,'sdf3'),(338,6,34,157,434,34.00,'sdfdsf'),(343,1,34343,161,3434,4344.00,'sdfsdf'),(344,8,3434,162,3434,434.00,'sdfasdf'),(346,12,444,127,444,6665.00,'Hey bro!!'),(348,10,434,98,344,NULL,NULL),(349,7,3,164,3,NULL,NULL),(350,13,2,164,4,NULL,NULL),(352,7,3,165,3,NULL,NULL),(353,13,2,165,4,NULL,NULL),(361,13,87867,167,567,NULL,NULL),(362,7,8678,167,768678,NULL,NULL),(364,13,87867,169,567,NULL,NULL),(365,7,8678,169,768678,NULL,NULL),(368,2,50,168,40,NULL,'TRERR'),(369,7,225,76,12,21.12,'tak'),(370,4,20,127,3,34.00,'ffdf'),(376,7,23,171,234,NULL,'sdfsdf'),(377,4,32,171,23,NULL,NULL),(378,2,23,171,0,NULL,NULL),(379,6,3434,171,23434234,NULL,NULL),(393,5,20,176,1,NULL,NULL),(394,6,23,176,3,NULL,'4567890'),(396,6,434,177,343,NULL,NULL),(398,6,10,178,34,4.00,'HOST'),(399,4,34,178,434,NULL,'sdfsadf'),(400,3,44,178,34,NULL,'sdf YEAHH'),(401,11,4,178,123,NULL,'sdff'),(402,5,43,178,0,NULL,'HOSTING '),(403,1,34,179,324,NULL,'sdfdf'),(404,5,34,179,434,NULL,NULL),(408,1,34,180,324,NULL,'sdfdf'),(409,5,34,180,434,NULL,NULL),(411,6,34,181,34,NULL,'sdf'),(412,1,434,181,43,NULL,NULL),(413,7,12,181,0,NULL,NULL),(414,6,34,182,34,NULL,'sdf'),(415,1,434,182,43,NULL,NULL),(416,7,12,182,0,NULL,NULL),(418,5,5555,184,444,NULL,'sdfsdaf'),(421,1,1,53,3,NULL,NULL),(422,2,2,53,2,NULL,NULL),(423,3,34343,53,4,NULL,NULL),(424,4,342,53,33,NULL,NULL),(425,8,444,53,33,NULL,NULL),(426,6,33,53,123,NULL,'sddvcasdc'),(427,10,34234,53,234324,NULL,'sdf sdf'),(433,8,434,189,1,NULL,''),(435,12,33,189,33,NULL,NULL),(436,5,9000,129,11,34.24,'some'),(437,5,34,190,344,NULL,'sdfdf'),(438,12,3434,190,3434,NULL,NULL),(439,5,34,191,34,NULL,NULL),(440,11,15634,189,123,12.00,'GREAT'),(441,1,555,192,0,NULL,''),(442,8,434,192,1,NULL,''),(443,6,44555,192,443,NULL,'123'),(444,12,33,192,33,NULL,NULL),(445,11,1,192,123,12.00,'GREAT'),(451,3,23,189,34,NULL,NULL),(452,4,324,189,4,NULL,NULL),(454,2,31,189,59,NULL,NULL),(458,11,234,195,234,NULL,NULL),(459,12,34,195,234,NULL,NULL),(461,11,43,164,4,NULL,NULL),(463,5,4,197,3,NULL,'sdfdf'),(464,5,1,198,0,NULL,NULL),(465,5,54,199,0,20.00,'sd'),(466,2,43,199,0,NULL,NULL),(467,10,50,200,0,12.00,NULL);
/*!40000 ALTER TABLE `dokumenty_p` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupy`
--

DROP TABLE IF EXISTS `grupy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `grupy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `aktywny` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupy`
--

LOCK TABLES `grupy` WRITE;
/*!40000 ALTER TABLE `grupy` DISABLE KEYS */;
INSERT INTO `grupy` VALUES (1,'biurowe',1),(2,'papierowe',1),(3,'techniczne',1),(4,'rzeczy',1);
/*!40000 ALTER TABLE `grupy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lokalizacje`
--

DROP TABLE IF EXISTS `lokalizacje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lokalizacje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) CHARACTER SET utf8 COLLATE utf8_polish_ci DEFAULT NULL,
  `aktywny` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lokalizacje`
--

LOCK TABLES `lokalizacje` WRITE;
/*!40000 ALTER TABLE `lokalizacje` DISABLE KEYS */;
INSERT INTO `lokalizacje` VALUES (1,'morczinki',1),(2,'gorczewska',1),(6,'Lolek',1);
/*!40000 ALTER TABLE `lokalizacje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materialy`
--

DROP TABLE IF EXISTS `materialy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `materialy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) DEFAULT NULL,
  `grupa_id` int(11) NOT NULL,
  `ean` varchar(45) DEFAULT NULL,
  `nazwa_skr` varchar(45) DEFAULT NULL,
  `aktywny` tinyint(1) DEFAULT NULL,
  `ilosc_alarm` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `grupa_id_idx` (`grupa_id`),
  CONSTRAINT `grupa_id` FOREIGN KEY (`grupa_id`) REFERENCES `grupy` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materialy`
--

LOCK TABLES `materialy` WRITE;
/*!40000 ALTER TABLE `materialy` DISABLE KEYS */;
INSERT INTO `materialy` VALUES (1,'Brystol A1',1,NULL,'Br A1',1,20),(2,'Papier A4',1,NULL,'P A4',1,10),(3,'Papier A3 ',2,NULL,'P A3',1,NULL),(4,'Papier kolorowy A4',2,NULL,'P kol A4',1,NULL),(5,'Blok techniczny a4',3,NULL,NULL,1,40),(6,'Blok techniczny AAA3',4,'4567890','AAA3',1,60),(7,'Zeszyt papierów kolorowych',2,NULL,NULL,0,NULL),(8,'Koszulki',4,NULL,NULL,1,300),(10,'Pisaki permanentne',1,NULL,NULL,1,NULL),(11,'Gąbka do tablic',1,NULL,NULL,1,500),(12,'Klej do papieru w sztyfcie',1,NULL,NULL,1,NULL),(13,'Taśma przeźroczysta',2,NULL,NULL,1,-135000);
/*!40000 ALTER TABLE `materialy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_inwentarizacji` date NOT NULL,
  `data_aktywnych_dokumentow` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'2019-06-18','2019-06-20');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uzytkownicy`
--

DROP TABLE IF EXISTS `uzytkownicy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `uzytkownicy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) DEFAULT NULL,
  `haslo` varchar(45) DEFAULT NULL,
  `uprawnienie` enum('root','admin','biuro','inni') NOT NULL,
  `lokalizacjaId` int(11) DEFAULT NULL,
  `aktywny` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lokalizacja_id_idx` (`lokalizacjaId`),
  CONSTRAINT `lokalizacja_id` FOREIGN KEY (`lokalizacjaId`) REFERENCES `lokalizacje` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uzytkownicy`
--

LOCK TABLES `uzytkownicy` WRITE;
/*!40000 ALTER TABLE `uzytkownicy` DISABLE KEYS */;
INSERT INTO `uzytkownicy` VALUES (1,'root','123','root',NULL,1),(2,'admin','admin','admin',1,1),(3,'biuro','biuro','biuro',1,1),(4,'inny','inny','inni',1,1),(9,'Lolek','lolek1','biuro',6,1);
/*!40000 ALTER TABLE `uzytkownicy` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-11 19:30:30
