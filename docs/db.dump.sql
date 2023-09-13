-- Adminer 4.7.6 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1,	'Administratif',	'2023-07-28 13:44:15',	'2023-07-28 13:44:15'),
(2,	'Cours',	'2023-07-28 13:44:15',	'2023-07-28 13:44:15'),
(3,	'Banque',	'2023-07-28 13:44:15',	'2023-07-28 13:44:15'),
(4,	'Pro',	'2023-07-28 13:44:15',	'2023-07-28 13:44:15'),
(5,	'Shopping',	'2023-07-28 13:44:15',	'2023-07-28 13:44:15');

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1,	'Travail',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(2,	'Personnel',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(3,	'Urgent',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(4,	'Important',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(5,	'Famille',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(6,	'Loisirs',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(7,	'Santé',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(8,	'Courses',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(9,	'Projet',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08'),
(10,	'Rendez-vous',	'2023-07-27 08:56:08',	'2023-07-27 08:56:08');

DROP TABLE IF EXISTS `tag_task`;
CREATE TABLE `tag_task` (
  `tag_id` int(10) unsigned NOT NULL,
  `task_id` bigint(20) unsigned NOT NULL,
  KEY `tag_id` (`tag_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `tag_task_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`),
  CONSTRAINT `tag_task_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `tag_task` (`tag_id`, `task_id`) VALUES
(2,	44),
(7,	44),
(8,	45);

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` tinyint(4) DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tasks` (`id`, `category_id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(44,	1,	'Payer la facture du docteur',	0,	'2023-07-28 11:42:48',	'2023-07-28 11:42:48'),
(45,	5,	'Acheter des pommes',	0,	'2023-07-28 11:44:31',	'2023-07-28 11:44:31'),
(46,	NULL,	'Rendre le DVD à Pierre',	0,	'2023-07-28 11:45:13',	'2023-07-28 11:45:13');

-- 2023-07-28 13:46:28