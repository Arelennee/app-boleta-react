-- MySQL dump 10.13  Distrib 8.4.6, for Win64 (x86_64)
--
-- Host: localhost    Database: sistema_boletas
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boleta`
--

DROP TABLE IF EXISTS `boleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleta` (
  `id_boleta` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('PROFORMA','VENTA') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_emision` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cliente_nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cliente_dni` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cliente_ruc` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empresa_ruc` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `atendido_por` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `numero_boleta` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `cliente_cel` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdf_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_boleta`),
  UNIQUE KEY `numero_boleta` (`numero_boleta`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta`
--

LOCK TABLES `boleta` WRITE;
/*!40000 ALTER TABLE `boleta` DISABLE KEYS */;
INSERT INTO `boleta` VALUES (1,'PROFORMA','2025-08-10 20:41:07','Juan Pérez','12345678','20123456789','10293847566','Pedro Gómez',230.50,230.50,NULL,'Entrega en 3 días','',NULL),(2,'PROFORMA','2025-08-10 22:39:39','Juanito Pérez','12345678','20123456789','10293847566','Pedroasd Gómez',200.50,200.50,'PROF-000000001','Entrega en 5 días','',NULL),(3,'PROFORMA','2025-08-11 20:47:29','Juan Pérez','12345678',NULL,'20602547109','Carlos Ramírez',250.00,250.00,'PROF-000000002','Cliente solicita servicio rápido','',NULL),(4,'PROFORMA','2025-08-16 12:13:44','asdasdasd','123123','91829308','20602547109','ojabsdjobad',0.00,0.00,'PROF-000000003','tiene sida','',NULL),(5,'PROFORMA','2025-08-17 21:17:56','juanito','91823981','89172389123','20602547109','pepe',90090.00,90090.00,'PROF-000000004','pc no enciende y tiene un monton de porno','',NULL),(6,'PROFORMA','2025-08-23 11:02:03','Juanito Pérez','12345678','20123456789','20602547109','Pedroasd Gómez',200.50,200.50,'PROF-000000005','Entrega en 5 días','',NULL),(7,'PROFORMA','2025-08-23 11:04:35','Juan Pérez','12345678','20123456789','20602547109','María López',350.00,350.00,'PROF-000000006','Cliente solicita diagnóstico urgente.','',NULL),(8,'PROFORMA','2025-08-24 13:04:37','juanito','91823981','89172389123','20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000007','tiene sida','',NULL),(9,'PROFORMA','2025-08-24 13:16:48','example','9182398','72372381','20602547109','Alvaro Palomino',1000.00,1000.00,'PROF-000000008','oiuabsduin asoiudbauysd','',NULL),(10,'PROFORMA','2025-08-24 13:19:16','example1','91823982','723723813','20602547109','Alvaro Palomino',1123.00,1123.00,'PROF-000000009','oiuabsduin asoiudbauysd123','',NULL),(11,'PROFORMA','2025-08-24 13:40:21','Juanati Pérez','123123678','20123456000','20602547109','María López',350.00,350.00,'PROF-000000010','Cliente solicita diagnóstico urgente.','',NULL),(12,'PROFORMA','2025-08-24 15:28:04','example3','98017283','7896123786123','20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000011','huavdiupasbdyasvdb','',NULL),(13,'PROFORMA','2025-08-24 15:33:08','example4','9182398','1111111111','20602547109','Alvaro Palomino',0.00,0.00,'PROF-000000012','iasbduiobasudijnasdioansdoiansdoiand','',NULL),(14,'PROFORMA','2025-08-24 15:33:10','example4','9182398','1111111111','20602547109','Alvaro Palomino',900.00,900.00,'PROF-000000013','iasbduiobasudijnasdioansdoiansdoiand','',NULL),(15,'PROFORMA','2025-08-24 16:16:54','example5','981723897',NULL,'20602547109','Alvaro Palomino',212.00,212.00,'PROF-000000014','jobaodjasjodn','',NULL),(16,'PROFORMA','2025-08-24 16:21:48','example6','9817238912',NULL,'20602547109','Alvaro Palomino',9000335.00,9000335.00,'PROF-000000015','jobaodjasjodnaojsduasd','',NULL),(17,'PROFORMA','2025-09-19 09:47:31','pepo','798612378',NULL,'20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000016',NULL,'',NULL),(18,'PROFORMA','2025-09-19 10:31:33','marie','81728321',NULL,'20602547109','Alvaro Palomino',120.00,120.00,'PROF-000000017',NULL,'',NULL),(19,'PROFORMA','2025-09-19 11:03:55','hiavsdyhuiasd','8012738',NULL,'20602547109','Alvaro Palomino',179.00,179.00,'PROF-000000018','ihasv sdiybashidjvb auidjbasd ijas dgjkasn dkola jfilksdy fhoasdjfhk ban sdiasd zdf h aosdkjbas dbasDJÆIKAZ ITSDF','',NULL),(20,'PROFORMA','2025-09-19 11:30:02','ojagsbdj','11038901',NULL,'20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000019','ijoasg duioasg diuy8asgvdyabdsv','',NULL),(21,'PROFORMA','2025-09-19 11:31:38','ojagsbdjoi','11038932',NULL,'20602547109','Alvaro Palomino',1200.00,1200.00,'PROF-000000020','ijoasg duioasioajsbdj','',NULL),(22,'PROFORMA','2025-09-19 11:35:20','ojagsbdjoitas','1103893254',NULL,'20602547109','Alvaro Palomino',1290.00,1290.00,'PROF-000000021','la pc tiene sida agudo y todos los problemas','',NULL),(23,'PROFORMA','2025-09-19 11:49:38','hjabsdhjikasbd','09127839',NULL,'20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000022','asdhjavsdh','',NULL),(24,'PROFORMA','2025-09-19 11:49:43','hjabsdhjikasbd','09127839',NULL,'20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000023','asdhjavsdh','',NULL),(25,'PROFORMA','2025-09-19 11:51:02','hjabsdhjikasbd','09127839',NULL,'20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000024','asdhjavsdh','',NULL),(26,'PROFORMA','2025-09-19 11:55:57','hujasvdhijabsd','0891238',NULL,'20602547109','Alvaro Palomino',90.00,90.00,'PROF-000000025',NULL,'',NULL),(27,'PROFORMA','2025-09-19 12:45:01','hujasvdhijabsd','08912381',NULL,'20602547109','Alvaro Palomino',120.00,120.00,'PROF-000000026',NULL,'',NULL),(28,'PROFORMA','2025-09-19 12:46:09','hujasvdhijabsd','08912381',NULL,'20602547109','Alvaro Palomino',120.00,120.00,'PROF-000000027',NULL,'',NULL),(29,'PROFORMA','2025-10-02 20:49:06','Gino Huayhas',NULL,NULL,'20602547109','Alvaro Palomino',340.00,340.00,'PROF-000000028','asjodbjioasbdiujasbduiabsduijadbujhb','901237631',NULL),(30,'PROFORMA','2025-10-02 20:56:12','jacob','981276',NULL,'20602547109','Alvaro Palomino',740.00,740.00,'PROF-000000029','asjidbuajsdbausidbnuajisdnadijubn','90825638',NULL),(31,'PROFORMA','2025-10-02 21:08:43','juanito alcachofa',NULL,NULL,'20602547109','Alvaro Palomino',550.00,550.00,'PROF-000000030','jiasbdujiasbndjiabsdijnasdjuibnopajsdopjasd','901237834',NULL),(32,'PROFORMA','2025-10-02 21:18:14','asojdbnajds',NULL,'8901273897','20602547109','Alvaro Palomino',723.00,723.00,'PROF-000000031',NULL,'90128936',NULL),(33,'PROFORMA','2025-10-02 21:47:51','iyuvqabsuydhbavhsuyd','09039192','8912763891','20602547109','Alvaro Palomino',730.00,730.00,'PROF-000000032','aojsdbojasndoasndioash dojabsdijasdioajsdiajsdio0asd  naiopsdhoiasndoihdfojhfiohfi 9oashdi0hq08oihfoihaofih aioshjoaifhouiadsf haiofhaosiuyhqwi90rhjdasf7uhawerfhdfi hfad iofhjasodiahsd asidhjaosd aiosdhj oaisdhaosi d','90123807',NULL),(34,'PROFORMA','2025-10-03 15:07:57','ihdoifhasf',NULL,NULL,'20602547109','Alvaro Palomino',1300.00,1300.00,'PROF-000000033','pc sin ','9012390',NULL),(35,'PROFORMA','2025-10-03 16:09:56','pepe gonzales',NULL,NULL,'20602547109','Alvaro Palomino',1290.00,1290.00,'PROF-000000034','aokhdoiasdhuoiandua','9012333312','pdfs/PROF-000000034.pdf'),(36,'PROFORMA','2025-10-03 16:52:59','aojsbdjoabd',NULL,NULL,'20602547109','Alvaro Palomino',210.00,210.00,'PROF-000000035','aodbauoisdbauidbauisdbaoidhoiqjipofjoiafhniohw','90123812','pdfs/PROF-000000035.pdf'),(37,'PROFORMA','2025-10-03 16:57:37','hbvaiudbasoudb',NULL,NULL,'20602547109','Alvaro Palomino',470.00,470.00,'PROF-000000036',NULL,'90129309','pdfs/PROF-000000036.pdf');
/*!40000 ALTER TABLE `boleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boleta_detalle_producto`
--

DROP TABLE IF EXISTS `boleta_detalle_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleta_detalle_producto` (
  `id_detalle_producto` int NOT NULL AUTO_INCREMENT,
  `id_boleta` int NOT NULL,
  `nombre_producto` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `precio_unitario` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_item` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_detalle_producto`),
  KEY `id_boleta` (`id_boleta`),
  CONSTRAINT `boleta_detalle_producto_ibfk_1` FOREIGN KEY (`id_boleta`) REFERENCES `boleta` (`id_boleta`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta_detalle_producto`
--

LOCK TABLES `boleta_detalle_producto` WRITE;
/*!40000 ALTER TABLE `boleta_detalle_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `boleta_detalle_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boleta_equipo`
--

DROP TABLE IF EXISTS `boleta_equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleta_equipo` (
  `id_boleta_equipo` int NOT NULL AUTO_INCREMENT,
  `id_boleta` int NOT NULL,
  `id_equipo_catalogo` int NOT NULL,
  `descripcion_equipo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_boleta_equipo`),
  KEY `id_boleta` (`id_boleta`),
  KEY `id_equipo_catalogo` (`id_equipo_catalogo`),
  CONSTRAINT `boleta_equipo_ibfk_1` FOREIGN KEY (`id_boleta`) REFERENCES `boleta` (`id_boleta`) ON DELETE CASCADE,
  CONSTRAINT `boleta_equipo_ibfk_2` FOREIGN KEY (`id_equipo_catalogo`) REFERENCES `equipo_catalogo` (`id_equipo_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta_equipo`
--

LOCK TABLES `boleta_equipo` WRITE;
/*!40000 ALTER TABLE `boleta_equipo` DISABLE KEYS */;
INSERT INTO `boleta_equipo` VALUES (1,1,1,'Laptop Lenovo'),(2,2,1,'Laptop Lasdaenovo'),(3,3,1,'Laptop Lenovo con problemas de encendido'),(4,3,2,'PC de escritorio con fallas en el sistema operativo'),(5,5,2,'lenovo thinq'),(6,6,1,'Laptop Lasdaenovo'),(7,7,1,'Laptop Lenovo ThinkPad'),(8,7,2,'Impresora HP LaserJet'),(9,8,1,'i3 3ra generacion 2gb ram'),(10,9,2,'example'),(11,10,2,'example'),(12,10,3,'asdasd'),(13,11,1,'Laptop Lenovo ThinkPad'),(14,11,2,'Impresora HP LaserJet'),(15,12,2,'epson modo sexo'),(16,14,1,'i3'),(17,15,1,'dasdasd'),(18,16,1,'dasdasd'),(19,16,2,'iasbdja'),(20,17,2,'i7 9na 16gb ram'),(21,18,2,'i9 11va 4gb ram'),(22,19,3,'jiasbdui'),(23,19,2,'jasbhdj'),(24,20,2,'sexo1'),(25,21,1,'i8 9na 7gb ram'),(26,22,1,'i8 9na 7gb ram'),(27,22,3,'hjvashujdvb'),(28,23,2,'ojasdnjak'),(29,24,2,'ojasdnjak'),(30,25,2,'ojasdnjak'),(31,26,2,'jklasbndj'),(32,27,1,'ajsbdhj'),(33,28,1,'ajsbdhj'),(34,29,1,'asujdbaujdi'),(35,29,3,'ujaosbndijuabnds'),(36,30,1,'oasbdoujiad'),(37,30,3,'joasbdjuabsd'),(38,31,1,'kjasdbj'),(39,32,2,'jabsdjiabnsdj'),(40,32,3,'canon g2160'),(41,33,1,'oaishdujiaobd'),(42,33,3,'joasbdjabnd'),(43,34,1,'i7 '),(44,34,3,'kbasdbd'),(45,35,2,'ajisdbajsidb'),(46,36,1,'asidbaud'),(47,37,3,'askbajd'),(48,37,1,'ojabsdubadj');
/*!40000 ALTER TABLE `boleta_equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boleta_equipo_servicio`
--

DROP TABLE IF EXISTS `boleta_equipo_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleta_equipo_servicio` (
  `id_boleta_equipo_servicio` int NOT NULL AUTO_INCREMENT,
  `id_boleta_equipo` int NOT NULL,
  `nombre_servicio` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_servicio` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_boleta_equipo_servicio`),
  KEY `id_boleta_equipo` (`id_boleta_equipo`),
  CONSTRAINT `boleta_equipo_servicio_ibfk_1` FOREIGN KEY (`id_boleta_equipo`) REFERENCES `boleta_equipo` (`id_boleta_equipo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta_equipo_servicio`
--

LOCK TABLES `boleta_equipo_servicio` WRITE;
/*!40000 ALTER TABLE `boleta_equipo_servicio` DISABLE KEYS */;
INSERT INTO `boleta_equipo_servicio` VALUES (1,1,'Reparación de pantalla',150.50),(2,1,'Cambio de teclado',80.00),(3,2,'Reparación de pantalla',190.50),(4,2,'Cambio de teclado',10.00),(5,3,'Revisión de hardware',50.00),(6,3,'Cambio de batería',120.00),(7,4,'Instalación de Windows',80.00),(8,5,'mantenimiento',90.00),(9,5,'cambio de pantalla',90000.00),(10,6,'Reparación de pantalla',190.50),(11,6,'Cambio de teclado',10.00),(12,7,'Reemplazo de pantalla',200.00),(13,7,'Instalación de software',50.00),(14,8,'Mantenimiento general',100.00),(15,9,'mantenimiento',90.00),(16,10,'example',1000.00),(17,11,'example',1000.00),(18,12,'asdasddasdv',123.00),(19,13,'Reemplazo de pantalla',200.00),(20,13,'Instalación de software',50.00),(21,14,'Mantenimiento general',100.00),(22,15,'cambio de cartuchos',90.00),(23,16,'sexo',900.00),(24,17,'asdasd',212.00),(25,18,'asdasd',212.00),(26,19,'aisndiansd',9000123.00),(27,20,'mantenimiento',90.00),(28,21,'Mantenimiento',120.00),(29,22,'9uiansd98',98.00),(30,23,'ojasbhduji',81.00),(31,24,'mantenimiento',90.00),(32,25,'ojasbdujb',1200.00),(33,26,'ojasbdujb',1200.00),(34,27,'ajisbdiuahjsbd',90.00),(35,28,'ajsundujioasd',90.00),(36,29,'ajsundujioasd',90.00),(37,30,'ajsundujioasd',90.00),(38,31,'asskdnaksd',90.00),(39,32,'asjdbjas',120.00),(40,33,'asjdbjas',120.00),(41,34,'asjodbaijousd',90.00),(42,34,'auisobduiabsd',120.00),(43,35,'ioaksndioad90',130.00),(44,36,'ojabsdjoabsd',90.00),(45,36,'jaksbdjkasd',130.00),(46,36,'oajsdoadjs',400.00),(47,37,'ajosbdjad',120.00),(48,38,'asjdbnajsdn',120.00),(49,38,'akosbndoikadns',400.00),(50,38,'iopanjdsiands',30.00),(51,39,'oaisbnduijoabd',90.00),(52,39,'ujiasbduiabhd',120.00),(53,39,'ajksdbajisbdn',40.00),(54,39,'asjkdbnajksdnad',123.00),(55,40,'oajsbndjabdn',300.00),(56,40,'ioasbhduoajbds',50.00),(57,41,'pasenporno',120.00),(58,41,'aojisbdjuaiobd',90.00),(59,41,'|',400.00),(60,42,'ajisbdjahudb',120.00),(61,43,'yusgdyuasdh',182.00),(62,44,'ajisbds',918.00),(63,44,'aoishdoiahsd',200.00),(64,45,'oasjdoipajweiqbn',1290.00),(65,46,'asodnai',90.00),(66,46,'oaisndiand',120.00),(67,47,'aojsdnbaidn',120.00),(68,47,'asodbnaidn',320.00),(69,48,'aksdnaid',30.00);
/*!40000 ALTER TABLE `boleta_equipo_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipo_catalogo`
--

DROP TABLE IF EXISTS `equipo_catalogo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipo_catalogo` (
  `id_equipo_catalogo` int NOT NULL AUTO_INCREMENT,
  `nombre_equipo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_equipo_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipo_catalogo`
--

LOCK TABLES `equipo_catalogo` WRITE;
/*!40000 ALTER TABLE `equipo_catalogo` DISABLE KEYS */;
INSERT INTO `equipo_catalogo` VALUES (1,'PC'),(2,'LAPTOP'),(3,'IMPRESORA');
/*!40000 ALTER TABLE `equipo_catalogo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajadores`
--

DROP TABLE IF EXISTS `trabajadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trabajadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajadores`
--

LOCK TABLES `trabajadores` WRITE;
/*!40000 ALTER TABLE `trabajadores` DISABLE KEYS */;
INSERT INTO `trabajadores` VALUES (1,'Alvaro Palomino');
/*!40000 ALTER TABLE `trabajadores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-03 17:31:14