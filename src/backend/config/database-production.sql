-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: sistema_boletas
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

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
  `pdf_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_boleta`),
  UNIQUE KEY `numero_boleta` (`numero_boleta`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta`
--

LOCK TABLES `boleta` WRITE;
/*!40000 ALTER TABLE `boleta` DISABLE KEYS */;
INSERT INTO `boleta` VALUES (37,'PROFORMA','2025-10-13 22:56:44','kenyo velveder',NULL,NULL,'20602547109','Hugo Santos',50.00,50.00,'PROF-000000053','C/ CARGADOR','959415909','pdfs/PROF-000000053.pdf'),(38,'PROFORMA','2025-10-14 16:45:15','Jaime De Las Casas','15748085',NULL,'20602547109','Hugo Santos',390.00,390.00,'PROF-000000054','GARANTÍA DE 6 MESES\n\nCUALQUIER CONSULTA O GARANTÍA ACERCARSE CON BOLETA','916922437','pdfs/PROF-000000054.pdf'),(39,'PROFORMA','2025-10-15 21:12:22','Elmer Fabian ','21288085',NULL,'20602547109','Juan Carlos',45.00,45.00,'PROF-000000055','IMPRESORA 475 CON BLOQUEO DE ALMOHADILLAS','987634381','pdfs/PROF-000000055.pdf'),(40,'PROFORMA','2025-10-17 16:30:03','MARTA',NULL,NULL,'20602547109','Josue',26.00,26.00,'PROF-000000056','NINGUNA','999999999','pdfs/PROF-000000056.pdf'),(41,'PROFORMA','2025-10-17 16:30:47','JUAN ',NULL,NULL,'20602547109','Josue',70.00,70.00,'PROF-000000057','NINGUNA','999999999','pdfs/PROF-000000057.pdf'),(42,'PROFORMA','2025-10-17 17:28:34','LEONIDAS PINEDO',NULL,NULL,'20602547109','Josue',70.00,70.00,'PROF-000000058','DEJO CABLE DE PODER EN UNA BOLSA (IMPRESORA)','98120773','pdfs/PROF-000000058.pdf'),(43,'PROFORMA','2025-10-17 21:56:58','Matius Davila','72771439',NULL,'20602547109','Juan Carlos',50.00,50.00,'PROF-000000059','IMPRESORA CANON 3101 PROBLEMAS DE WIFI Y COLOR NEGRO NO IMPRIME.','906265352','pdfs/PROF-000000059.pdf'),(44,'PROFORMA','2025-10-20 19:25:16','CLAUDIA LEVANO',NULL,NULL,'20602547109','Josue',90.00,90.00,'PROF-000000060','NINGUNA','991005820','pdfs/PROF-000000060.pdf'),(45,'PROFORMA','2025-10-20 22:50:29','MOISES BRICEINOR ',NULL,NULL,'20602547109','Josue',0.00,0.00,'PROF-000000061','DEJO CARGADOR CUADRADO (LAPTOP LENOVO)','945430958','pdfs/PROF-000000061.pdf'),(46,'PROFORMA','2025-10-22 17:14:23','EVA TOAMAYRO',NULL,NULL,'20602547109','Josue',50.00,50.00,'PROF-000000062','NINGUNA ','961771344','pdfs/PROF-000000062.pdf'),(47,'PROFORMA','2025-10-23 22:54:37','RENZO FALCON',NULL,NULL,'20602547109','Josue',0.00,0.00,'PROF-000000063','NINGUNA ','921785616','pdfs/PROF-000000063.pdf'),(48,'PROFORMA','2025-10-24 17:36:49','edwin quispe',NULL,NULL,'20602547109','Hugo Santos',395.00,395.00,'PROF-000000064',NULL,'912888909','pdfs/PROF-000000064.pdf'),(49,'PROFORMA','2025-10-24 22:49:01','Moises Briceño','40807609',NULL,'20602547109','Juan Carlos',250.00,250.00,'PROF-000000065','LAPTOP LENOVO NO PRENDÍA, SE HIZO REPARADOR DE PLACA EN REGULADOR DE VOLTAJE','945430958','pdfs/PROF-000000065.pdf'),(50,'PROFORMA','2025-10-24 22:57:48','Moises Briceño','40807609',NULL,'20602547109','Juan Carlos',120.00,120.00,'PROF-000000066','LAPTOP DUAL-CORE LENTA Y SIN BATERÍA, SE LE INDICA EL PRECIO DE LA BATEÍA APROX 90 A 120 SOLES.\n','945430958','pdfs/PROF-000000066.pdf');
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta_equipo`
--

LOCK TABLES `boleta_equipo` WRITE;
/*!40000 ALTER TABLE `boleta_equipo` DISABLE KEYS */;
INSERT INTO `boleta_equipo` VALUES (48,37,1,'ojabsdubadj'),(49,38,1,'COMPUTADORA I5 3ra, 4GB RAM, 1TB HDD'),(50,39,3,'EPSON L475'),(51,40,3,'VENTA DE TINTA COMPATIBLE'),(52,41,2,'CARGADOR DE LAPTOP ASUS GENERICO (CUADRADA)'),(53,42,3,'NO RECONOCE CABEZAL'),(54,43,3,'CANON 3101'),(55,44,2,'VENTA DE CARGADOR HP REPLICA '),(56,45,2,'LAPTOP LENOVO, COLOR GRIS, NO PRENDE'),(57,46,3,'IMPRESORA L4160, MANTENIMIENTO GENERAL, EL COLOR NO IMPRIME Y LOS OTROS COLORES TIENE RAYAS'),(58,47,3,'IMPRIME OSCURO'),(59,48,2,'laptop lenovo i5 10ma'),(60,49,2,'LAPTOP LENOVO'),(61,50,2,'LAPTOP HP DUAL-CORE');
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta_equipo_servicio`
--

LOCK TABLES `boleta_equipo_servicio` WRITE;
/*!40000 ALTER TABLE `boleta_equipo_servicio` DISABLE KEYS */;
INSERT INTO `boleta_equipo_servicio` VALUES (68,48,'asdasd',30.00),(69,49,'Venta',390.00),(70,50,'DESBLOQUEO DE LA CAJA DE MANTENIMIENTO',45.00),(71,51,'VENTA',26.00),(72,52,'VENTA',70.00),(73,53,'MANTENIMIENTO',70.00),(74,54,'MANTENIMIENTO',50.00),(75,55,'VENTA',90.00),(76,56,'DIAGNOSTICO ',0.00),(77,57,'MANTENIMIENTO GENERAL',50.00),(78,58,'DIAGNOSTICO ',0.00),(79,59,'cambio de teclado, cambio de disco ssd 240gb y mantenimiento fisico',395.00),(80,60,'REPARACIÓN DE PLACA',250.00),(81,61,'CAMBIO DE BATERÍA',120.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajadores`
--

LOCK TABLES `trabajadores` WRITE;
/*!40000 ALTER TABLE `trabajadores` DISABLE KEYS */;
INSERT INTO `trabajadores` VALUES (1,'Alvaro Palomino'),(2,'Josue'),(3,'Juan Carlos'),(4,'Hugo Santos');
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

-- Dump completed on 2025-10-27 17:18:03
