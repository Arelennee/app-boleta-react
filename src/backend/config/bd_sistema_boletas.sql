-- MySQL dump 10.13  Distrib 8.4.5, for Linux (x86_64)
--
-- Host: localhost    Database: sistema_boletas
-- ------------------------------------------------------
-- Server version	8.4.5-0ubuntu0.2

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


CREATE DATABASE IF NOT EXISTS sistema_boletas
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE sistema_boletas;
--

DROP TABLE IF EXISTS `boleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boleta` (
  `id_boleta` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('PROFORMA','VENTA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_emision` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cliente_nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cliente_dni` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cliente_ruc` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `empresa_ruc` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `atendido_por` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dni_atiende` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL DEFAULT '0.00',
  `numero_boleta` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_boleta`),
  UNIQUE KEY `numero_boleta` (`numero_boleta`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta`
--

LOCK TABLES `boleta` WRITE;
/*!40000 ALTER TABLE `boleta` DISABLE KEYS */;
INSERT INTO `boleta` VALUES (1,'PROFORMA','2025-08-10 20:41:07','Juan Pérez','12345678','20123456789','10293847566','Pedro Gómez','87654321',230.50,230.50,NULL,'Entrega en 3 días');
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
  `nombre_producto` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `descripcion_equipo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_boleta_equipo`),
  KEY `id_boleta` (`id_boleta`),
  KEY `id_equipo_catalogo` (`id_equipo_catalogo`),
  CONSTRAINT `boleta_equipo_ibfk_1` FOREIGN KEY (`id_boleta`) REFERENCES `boleta` (`id_boleta`) ON DELETE CASCADE,
  CONSTRAINT `boleta_equipo_ibfk_2` FOREIGN KEY (`id_equipo_catalogo`) REFERENCES `equipo_catalogo` (`id_equipo_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta_equipo`
--

LOCK TABLES `boleta_equipo` WRITE;
/*!40000 ALTER TABLE `boleta_equipo` DISABLE KEYS */;
INSERT INTO `boleta_equipo` VALUES (1,1,1,'Laptop Lenovo');
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
  `nombre_servicio` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_servicio` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id_boleta_equipo_servicio`),
  KEY `id_boleta_equipo` (`id_boleta_equipo`),
  CONSTRAINT `boleta_equipo_servicio_ibfk_1` FOREIGN KEY (`id_boleta_equipo`) REFERENCES `boleta_equipo` (`id_boleta_equipo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boleta_equipo_servicio`
--

LOCK TABLES `boleta_equipo_servicio` WRITE;
/*!40000 ALTER TABLE `boleta_equipo_servicio` DISABLE KEYS */;
INSERT INTO `boleta_equipo_servicio` VALUES (1,1,'Reparación de pantalla',150.50),(2,1,'Cambio de teclado',80.00);
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
  `nombre_equipo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-10 20:54:39
