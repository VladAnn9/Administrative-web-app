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
  PRIMARY KEY (`id`),
  KEY `uzytkownik_id_idx` (`uzytkownik_id`),
  CONSTRAINT `uzytkownik_id` FOREIGN KEY (`uzytkownik_id`) REFERENCES `uzytkownicy` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokumenty_n`
--

LOCK TABLES `dokumenty_n` WRITE;
/*!40000 ALTER TABLE `dokumenty_n` DISABLE KEYS */;
INSERT INTO `dokumenty_n` VALUES (1,'0001-06-19',1,'WZ','edycja',-1),(2,'0001-06-19',1,'I','edycja',1),(3,'0003-06-19',1,'WZ','edycja',-1),(4,'0003-06-19',1,'Z','edycja',-1),(5,'0003-06-19',1,'Z','edycja',-1),(6,'0003-06-19',1,'Z','edycja',-1),(7,'0003-06-19',1,'Z','edycja',-1),(8,'0003-06-19',1,'Z','edycja',-1),(9,'0003-06-19',1,'Z','edycja',-1),(10,'0003-06-19',1,'Z','edycja',-1),(11,'0003-06-19',1,'Z','edycja',-1),(12,'0003-06-19',1,'Z','edycja',-1),(13,'0003-06-19',1,'WZ','edycja',-1),(14,'0003-06-19',1,'WZ','edycja',-1),(15,'0003-06-19',1,'PZ','edycja',1),(16,'0003-06-19',1,'PZ','edycja',1),(17,'0003-06-19',1,'PZ','edycja',1),(18,'0003-06-19',1,'PZ','edycja',1),(19,'0003-06-19',1,'PZ','edycja',1),(20,'0003-06-19',1,'PZ','edycja',1),(21,'0003-06-19',1,'PZ','edycja',1),(22,'0003-06-19',1,'PZ','edycja',1),(23,'0003-06-19',1,'PZ','edycja',1),(24,'0003-06-19',1,'PZ','edycja',1),(25,'0003-06-19',1,'PZ','edycja',1),(26,'0003-06-19',1,'PZ','edycja',1),(27,'0003-06-19',1,'PZ','edycja',1),(28,'0003-06-19',1,'PZ','edycja',1),(29,'0003-06-19',1,'PZ','edycja',1),(30,'0003-06-19',1,'PZ','edycja',1),(31,'0003-06-19',1,'PZ','edycja',1),(32,'0003-06-19',1,'PZ','edycja',1),(33,'0003-06-19',1,'Z','edycja',-1),(34,'0003-06-19',1,'Z','edycja',-1),(35,'0004-06-19',1,'PZ','edycja',1),(36,'0004-06-19',1,'PZ','gotowy',1),(37,'0007-06-19',1,'Z','edycja',-1),(38,'0007-06-19',1,'Z','edycja',-1),(39,'0007-06-19',1,'WZ','edycja',-1),(40,'0007-06-19',1,'WZ','edycja',-1),(41,'0007-06-19',1,'WZ','edycja',-1),(42,'0007-06-19',1,'WZ','edycja',-1),(43,'0007-06-19',1,'WZ','edycja',-1),(44,'0007-06-19',1,'Z','edycja',-1),(45,'0007-06-19',1,'Z','edycja',-1),(46,'0007-06-19',1,'Z','edycja',-1),(47,'0007-06-19',1,'Z','edycja',-1),(48,'0007-06-19',1,'Z','edycja',-1),(49,'0007-06-19',1,'Z','edycja',-1),(50,'0007-06-19',1,'PZ','edycja',1),(51,'0007-06-19',1,'Z','edycja',-1),(52,'0007-06-19',1,'Z','edycja',-1),(53,'0007-06-19',1,'Z','edycja',-1),(54,'0007-06-19',1,'Z','edycja',-1),(55,'0007-06-19',1,'Z','edycja',-1),(56,'0007-06-19',1,'Z','edycja',-1),(57,'0007-06-19',1,'Z','edycja',-1),(58,'0007-06-19',1,'Z','edycja',-1),(59,'0007-06-19',1,'Z','edycja',-1),(60,'0007-06-19',1,'Z','edycja',-1),(61,'0007-06-19',1,'Z','edycja',-1),(62,'0007-06-19',1,'Z','edycja',-1),(63,'0007-06-19',1,'Z','edycja',-1),(64,'0007-06-19',1,'Z','edycja',-1),(65,'0007-06-19',1,'Z','edycja',-1),(66,'0007-06-19',1,'Z','edycja',-1),(67,'0007-06-19',1,'Z','edycja',-1),(68,'0007-06-19',1,'Z','edycja',-1),(69,'0007-06-19',1,'PZ','edycja',1),(70,'0007-06-19',1,'WZ','edycja',-1),(71,'0007-06-19',1,'I','edycja',1),(72,'0007-06-19',1,'PZ','edycja',1),(73,'0007-06-19',1,'Z','edycja',-1),(74,'0008-06-19',1,'ZN','edycja',-1),(75,'0008-06-19',1,'ZN','edycja',-1),(76,'0008-06-19',1,'PZ','edycja',1),(77,'0008-06-19',1,'I','edycja',1),(78,'0008-06-19',1,'WZ','edycja',-1),(79,'0008-06-19',1,'WZ','edycja',-1),(80,'0008-06-19',1,'WZ','edycja',-1),(81,'0008-06-19',1,'WZ','edycja',-1),(82,'0008-06-19',1,'WZ','edycja',-1),(83,'0008-06-19',1,'I','edycja',1),(84,'0008-06-19',1,'I','edycja',1),(85,'0008-06-19',1,'I','edycja',1),(86,'0008-06-19',1,'I','edycja',1),(87,'0008-06-19',1,'I','edycja',1),(88,'0008-06-19',1,'I','edycja',1),(89,'0008-06-19',1,'I','edycja',1),(90,'0008-06-19',1,'WZ','edycja',-1),(91,'0008-06-19',1,'I','edycja',1),(92,'0009-06-19',1,'WZ','edycja',-1),(93,'0009-06-19',1,'I','gotowy',1),(94,'0009-06-19',1,'Z','gotowy',-1),(95,'0009-06-19',1,'WZ','edycja',-1),(96,'0009-06-19',1,'PZ','edycja',1),(97,'0009-06-19',1,'PZ','edycja',1),(98,'0009-06-19',1,'I','edycja',1),(99,'0009-06-19',1,'I','gotowy',1),(100,'0009-06-19',1,'I','edycja',1),(101,'0009-06-19',1,'I','gotowy',1),(102,'0009-06-19',4,'I','gotowy',1),(103,'2012-06-19',1,'PZ','gotowy',1),(104,'2012-06-19',1,'PZ','edycja',1),(105,'2012-06-19',1,'Z','gotowy',-1),(106,'2012-06-19',1,'Z','gotowy',-1),(107,'2012-06-19',1,'Z','gotowy',0),(108,'2013-06-19',1,'WZ','gotowy',-1),(109,'2019-06-13',1,'Z','gotowy',0),(110,'2019-06-13',1,'PZ','gotowy',1),(111,'2019-06-13',2,'WZ','edycja',-1),(112,'2019-06-13',1,'WZ','edycja',-1),(113,'2019-06-13',1,'WZ','edycja',-1),(114,'2019-06-13',1,'WZ','edycja',-1),(115,'2019-06-13',1,'WZ','edycja',-1),(116,'2019-06-13',1,'WZ','edycja',-1),(117,'2019-06-13',1,'Z','gotowy',0),(118,'2019-06-13',1,'WZ','edycja',-1),(119,'2019-06-13',1,'WZ','edycja',-1),(120,'2019-06-13',1,'Z','gotowy',0),(121,'2019-06-14',1,'WZ','edycja',-1),(122,'2019-06-14',1,'WZ','edycja',-1),(123,'2019-06-14',2,'Z','gotowy',0),(124,'2019-06-14',3,'Z','gotowy',0),(125,'2019-06-14',3,'WZ','edycja',-1);
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
  CONSTRAINT `dok_N_id` FOREIGN KEY (`dok_N_id`) REFERENCES `dokumenty_n` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `materialy_id` FOREIGN KEY (`materialy_id`) REFERENCES `materialy` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dokumenty_p`
--

LOCK TABLES `dokumenty_p` WRITE;
/*!40000 ALTER TABLE `dokumenty_p` DISABLE KEYS */;
INSERT INTO `dokumenty_p` VALUES (157,1,3,75,0,NULL,'fgfg'),(158,2,56,75,0,NULL,'FFF'),(159,4,5656,75,0,NULL,NULL),(160,1,1,76,0,NULL,'898'),(163,1,3,78,3,NULL,'dfdf'),(164,1,200,79,0,34.00,'LOOK'),(166,1,4,80,0,334.00,''),(169,1,44,82,44,44.00,'FFF'),(170,3,455,82,0,65.00,'fgfg'),(196,5,56,96,56,NULL,NULL),(197,5,45,97,45,5.00,'fgfg'),(205,5,3434,103,45,NULL,NULL),(206,13,43434,103,4343,NULL,NULL),(208,12,443,103,0,NULL,NULL),(209,3,5,103,0,NULL,'LOOOK'),(211,3,34,104,45,34.00,'sdf'),(221,12,123,106,123,NULL,'sdfsdfsdf'),(222,3,334,107,34,NULL,NULL),(223,11,434,108,34,NULL,'sdf'),(225,6,34,110,334,NULL,'sdfsdf'),(226,5,3434,111,45,NULL,NULL),(227,13,43434,111,4343,NULL,NULL),(228,12,443,111,0,NULL,NULL),(229,3,5,111,0,NULL,'LOOOK'),(233,5,34,116,34,NULL,'dfdf'),(234,6,34,117,43,34.00,'asdf'),(235,5,34,117,34,34.00,NULL),(237,11,34343,117,55555,NULL,'GGGGGGGGGGGGGGGGGGGGGGGGG'),(238,6,34,118,43,34.00,'asdf'),(239,5,34,118,34,34.00,NULL),(240,1,34,118,34,34.00,NULL),(241,11,43,118,43,NULL,'dfdf'),(246,1,4444,120,344,4.00,'sadfd'),(247,11,34,120,3434,34.00,'sdfsdf'),(248,13,434,120,3434,NULL,NULL),(249,6,34,121,43,34.00,'asdf'),(250,5,34,121,34,34.00,NULL),(251,1,34,121,34,34.00,NULL),(252,11,34343,121,55555,NULL,'GGGGGGGGGGGGGGGGGGGGGGGGG'),(256,3,334,122,34,NULL,NULL),(257,12,34,123,3434,NULL,'dsfdsf'),(258,8,243,123,343,NULL,NULL),(260,2,34,123,234,NULL,NULL),(261,12,3434,124,0,3434.00,'0'),(262,12,3434,125,0,3434.00,'0');
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
  `nazwa` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `aktywny` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupy`
--

LOCK TABLES `grupy` WRITE;
/*!40000 ALTER TABLE `grupy` DISABLE KEYS */;
INSERT INTO `grupy` VALUES (1,'biurowe',1),(2,'papierowe',1),(3,'techniczne',1),(4,'rzeczy',NULL);
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
  `nazwa` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `aktywny` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lokalizacje`
--

LOCK TABLES `lokalizacje` WRITE;
/*!40000 ALTER TABLE `lokalizacje` DISABLE KEYS */;
INSERT INTO `lokalizacje` VALUES (1,'morczinki',1),(2,'gorczewska',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materialy`
--

LOCK TABLES `materialy` WRITE;
/*!40000 ALTER TABLE `materialy` DISABLE KEYS */;
INSERT INTO `materialy` VALUES (1,'Brystol A1',1,NULL,'Br A1',1,NULL),(2,'Papier A4',1,NULL,'P A4',1,NULL),(3,'Papier A3 ',2,NULL,'P A3',1,NULL),(4,'Papier kolorowy A4',2,NULL,'P kol A4',1,NULL),(5,'Blok techniczny a4',3,NULL,NULL,1,NULL),(6,'Blok techniczny a3',3,NULL,NULL,NULL,NULL),(7,'Zeszyt papierów kolorowych',2,NULL,NULL,NULL,NULL),(8,'Koszulki',4,NULL,NULL,NULL,NULL),(9,'Pisaki do tablic',1,NULL,NULL,NULL,NULL),(10,'Pisaki permanentne',1,NULL,NULL,NULL,NULL),(11,'Gąbka do tablic',1,NULL,NULL,NULL,NULL),(12,'Klej do papieru w sztyfcie',1,NULL,NULL,NULL,NULL),(13,'Taśma przeźroczysta',1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `materialy` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uzytkownicy`
--

LOCK TABLES `uzytkownicy` WRITE;
/*!40000 ALTER TABLE `uzytkownicy` DISABLE KEYS */;
INSERT INTO `uzytkownicy` VALUES (1,'root','root','root',NULL,1),(2,'admin','admin','admin',NULL,1),(3,'biuro','biuro','biuro',1,1),(4,'inny','inny','inni',2,1);
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

-- Dump completed on 2019-06-14 14:16:24
