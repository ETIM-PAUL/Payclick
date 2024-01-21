-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `businesspassport_invoice`;
CREATE TABLE `businesspassport_invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_at` date NOT NULL,
  `update_at` datetime NOT NULL,
  `amount` int(11) NOT NULL,
  `currency` text NOT NULL,
  `payment_id` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` text NOT NULL,
  `app_id` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2023-12-11 09:13:14
