-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 52.91.145.10    Database: sgi_squad3
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

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
-- Table structure for table `managed_technologies`
--

DROP TABLE IF EXISTS `managed_technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managed_technologies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `technology_id` int DEFAULT NULL,
  `main_technology` tinyint(1) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `technology_id` (`technology_id`),
  CONSTRAINT `managed_technologies_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `managed_technologies_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managed_technologies`
--

LOCK TABLES `managed_technologies` WRITE;
/*!40000 ALTER TABLE `managed_technologies` DISABLE KEYS */;
INSERT INTO `managed_technologies` VALUES (11,3,1,NULL,NULL,NULL,NULL),(12,3,6,NULL,NULL,NULL,NULL),(13,3,7,NULL,NULL,NULL,NULL),(14,3,8,NULL,NULL,NULL,NULL),(15,3,12,NULL,NULL,NULL,NULL),(16,3,18,NULL,NULL,NULL,NULL),(43,2,1,NULL,NULL,NULL,NULL),(44,2,3,NULL,NULL,NULL,NULL),(45,2,6,NULL,NULL,NULL,NULL),(46,2,7,NULL,NULL,NULL,NULL),(47,2,8,NULL,NULL,NULL,NULL),(48,2,9,NULL,NULL,NULL,NULL),(49,2,12,NULL,NULL,NULL,NULL),(50,2,16,NULL,NULL,NULL,NULL),(51,2,18,NULL,NULL,NULL,NULL),(52,2,19,NULL,NULL,NULL,NULL),(53,4,21,NULL,NULL,NULL,NULL),(60,5,1,NULL,NULL,NULL,NULL),(61,5,6,NULL,NULL,NULL,NULL),(62,5,7,NULL,NULL,NULL,NULL),(63,5,12,NULL,NULL,NULL,NULL),(64,5,18,NULL,NULL,NULL,NULL),(65,12,1,NULL,NULL,NULL,NULL),(66,12,3,NULL,NULL,NULL,NULL),(67,12,8,NULL,NULL,NULL,NULL),(68,12,12,NULL,NULL,NULL,NULL),(69,12,18,NULL,NULL,NULL,NULL),(74,11,1,NULL,NULL,NULL,NULL),(75,11,6,NULL,NULL,NULL,NULL),(76,11,7,NULL,NULL,NULL,NULL),(77,11,12,NULL,NULL,NULL,NULL),(78,11,18,NULL,NULL,NULL,NULL),(79,13,1,NULL,NULL,NULL,NULL),(80,13,6,NULL,NULL,NULL,NULL),(81,13,7,NULL,NULL,NULL,NULL),(82,13,8,NULL,NULL,NULL,NULL),(83,13,12,NULL,NULL,NULL,NULL),(84,13,18,NULL,NULL,NULL,NULL),(85,18,1,NULL,NULL,NULL,NULL),(86,18,2,NULL,NULL,NULL,NULL),(87,18,3,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `managed_technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `team_id` (`team_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `members_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`),
  CONSTRAINT `members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,2,3,'2024-10-30','2024-10-30',NULL),(2,2,4,'2024-10-30','2024-10-30',NULL),(3,2,5,'2024-10-30','2024-10-30',NULL),(4,2,11,'2024-10-30','2024-10-30',NULL),(5,2,12,'2024-10-30','2024-10-30',NULL),(6,2,2,'2024-10-30','2024-10-30',NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (1,'/home',NULL,'Home','2024-09-10',NULL,NULL,1),(2,'/profile/config',NULL,'Configuración','2024-09-10',NULL,NULL,4),(3,'/profile/programs',NULL,'Programas','2024-09-10',NULL,NULL,3),(4,'/profile/view-participants',NULL,'Participantes','2024-09-10',NULL,NULL,2),(5,'/profile/teams',NULL,'Asignación de equipos','2024-09-10',NULL,NULL,4),(6,'/profile/comunication',NULL,'Comunicación','2024-10-10',NULL,NULL,6);
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus_roles`
--

DROP TABLE IF EXISTS `menus_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_id` (`menu_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `menus_roles_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`),
  CONSTRAINT `menus_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus_roles`
--

LOCK TABLES `menus_roles` WRITE;
/*!40000 ALTER TABLE `menus_roles` DISABLE KEYS */;
INSERT INTO `menus_roles` VALUES (1,1,1,'2024-09-10',NULL,NULL),(2,1,2,'2024-09-10',NULL,NULL),(3,1,3,'2024-09-10',NULL,NULL),(6,4,3,'2024-09-10',NULL,NULL),(8,5,3,'2024-09-10',NULL,NULL),(11,4,2,'2024-10-13',NULL,NULL),(12,4,1,'2024-10-13',NULL,NULL);
/*!40000 ALTER TABLE `menus_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'ONG Forge','https://fondationforge.org/','2024-09-10',NULL,NULL),(2,'ONG Codo a Codo',' ','2024-09-10',NULL,NULL),(3,'ONG Silvertech','https://www.soysilvertech.org/','2024-09-10',NULL,NULL),(4,'Epidata','https://epidata.net/es/','2024-09-10',NULL,NULL),(5,'Default System',' ','2024-09-10',NULL,NULL);
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `state_id` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1,'Web','Desarrollo Web',1,'2024-08-16','2024-08-16','2024-09-01','2024-12-15',NULL),(2,'Datos','Ciencia de Datos',2,'2024-08-16','2024-08-16','2024-10-01','2025-03-15',NULL),(3,'Gestión','Proyectos',1,'2024-08-16','2024-08-16','2024-11-01','2025-05-15',NULL),(4,'Test','QA',1,'2024-08-16','2024-08-16','2024-08-16','2024-08-16',NULL),(5,'Acelerador','Polo IT',1,'2024-08-16','2024-08-16','2024-08-16','2025-03-15',NULL);
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Graduado','2024-08-16','2024-08-16',NULL),(2,'Mentor','2024-08-16','2024-08-16',NULL),(3,'Administrador','2024-08-16','2024-08-16',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Activo','2024-08-16','2024-09-10',NULL),(2,'Inactivo','2024-08-16','2024-09-10',NULL),(3,'Registrado','2024-08-16','2024-09-10',NULL);
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `state_id` int DEFAULT NULL,
  `program_id` int DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  KEY `program_id` (`program_id`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`),
  CONSTRAINT `teams_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (2,'Acelerador-team One','Acelerador-team One-programa:Acelerador',1,5,'2024-10-30','2024-10-30',NULL);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technologies`
--

DROP TABLE IF EXISTS `technologies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technologies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `deleted_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technologies`
--

LOCK TABLES `technologies` WRITE;
/*!40000 ALTER TABLE `technologies` DISABLE KEYS */;
INSERT INTO `technologies` VALUES (1,'JavaScript','2024-08-16','2024-08-16',NULL),(2,'Python','2024-08-16','2024-08-16',NULL),(3,'Java','2024-08-16','2024-08-16',NULL),(4,'C#','2024-08-16','2024-08-16',NULL),(5,'Ruby','2024-08-16','2024-08-16',NULL),(6,'HTML','2024-08-16','2024-08-16',NULL),(7,'CSS','2024-08-16','2024-08-16',NULL),(8,'SQL','2024-08-16','2024-08-16',NULL),(9,'PHP','2024-08-16','2024-08-16',NULL),(10,'Swift','2024-08-16','2024-08-16',NULL),(11,'Kotlin','2024-08-16','2024-08-16',NULL),(12,'TypeScript','2024-08-16','2024-08-16',NULL),(13,'R','2024-08-16','2024-08-16',NULL),(14,'Go','2024-08-16','2024-08-16',NULL),(15,'Rust','2024-08-16','2024-08-16',NULL),(16,'Docker','2024-08-16','2024-08-16',NULL),(17,'Kubernetes','2024-08-16','2024-08-16',NULL),(18,'React','2024-08-16','2024-08-16',NULL),(19,'Angular','2024-08-16','2024-08-16',NULL),(20,'Vue.js','2024-08-16','2024-08-16',NULL),(21,'UX/UI','2024-08-16','2024-08-16',NULL),(22,'QA','2024-08-16','2024-08-16',NULL),(23,'Functional Analyst','2024-08-16','2024-08-16',NULL);
/*!40000 ALTER TABLE `technologies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `dni` varchar(15) DEFAULT NULL,
  `description` text,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `state_id` int NOT NULL DEFAULT '1',
  `deleted_at` date DEFAULT NULL,
  `organization_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_ibfk_2_idx` (`state_id`),
  KEY `users_ibfk_1` (`role_id`),
  KEY `users_ibfk_2_idx1` (`organization_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'System','Admin',NULL,'00000000','Usuario Demo Admin System','admin@admin.com','$2a$12$Gd6O/LBWZMKbh5n8yN4NkuF50zJ837Z6rTFDQ1creoOAE/S/col/2',3,'2024-09-15','2024-10-28',1,NULL,5),(2,'Carmin','Espinoza',NULL,'11111111','Mentora del SQUAD 3','carmine@epidataconsulting.com','$2a$12$yb5Qx3.9HDOtynlbPEZYcOxdEcfMnJHlhn5rPpKKvKn79jzPnafSy',2,'2024-10-27','2024-10-27',1,NULL,4),(3,'Matias','Carini',NULL,'11111112','Integrante del SQUAD 3','matiascarini@gmail.com','$2a$12$cPQwsSdI9la8tlE55XsBJ.gG.cIUD1Ju2mdZkTEN.F61CguuarN1W',1,'2024-10-27','2024-10-27',1,NULL,1),(4,'Belén','Tejada',NULL,'11111113','Integrante del SQUAD 3','belentejada65@gmail.com','$2a$12$rQr6FlP0nTAYG/jzccNVVuaPCyrc5qDALns5RExa1BG3WR0jUomTS',1,'2024-10-27','2024-10-27',1,NULL,1),(5,'Yanina','Martin',NULL,'11111114','Integrante del SQUAD 3','yaninamicamartin@gmail.com','$2a$12$9.HstnJo2uBXZckVXThxjee26HbWjeZ5ngKS8ueUYSxdFDEau1ecK',1,'2024-10-27','2024-10-27',1,NULL,2),(11,'Matias','Contreras',NULL,'11111115','Integrante del SQUAD 3','matiasleoncontreras@gmail.com','$2a$12$t2JaCOr/fhmq/XIu7xCK/epmxtnXMbZPgfCJopHuI.yA33/A5mLAq',1,'2024-10-27','2024-10-27',1,NULL,1),(12,'Ignacio','Senicen',NULL,'11111116','Integrante del SQUAD 3','senicenmuoz@gmail.com','$2a$12$UkfbFH3ur1/16XWS1mSxfO9yeKtHecVSFYg1xDpgA7XK0aZ/YERra',1,'2024-10-27','2024-10-27',1,NULL,1),(13,'Ludmila','Muñoz',NULL,'11111117','Integrante del SQUAD 3','ludmila.mloza@gmail.com','$2a$12$Z6hy1BjJszUa3VWd8um7JuBu6ftp7fWmd1pAtdzn8RNAiQjNN/nxm',1,'2024-10-27','2024-10-27',1,NULL,1),(18,'John','Doe',NULL,'123456','Mi perfil','Johndoe@mail.com','$2a$12$hKq5hYAyI9wLo535yOsM..S/DAOr6GLYInjnBy8OLEeMzYEDR3Mh2',1,'2024-10-30','2024-10-30',1,NULL,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sgi_squad3'
--

--
-- Dumping routines for database 'sgi_squad3'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-28 20:19:04
