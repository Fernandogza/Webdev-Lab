-- phpMyAdmin SQL Dump
-- version 4.4.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Nov 05, 2015 at 08:00 AM
-- Server version: 5.6.25
-- PHP Version: 5.5.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `eventos`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocked`
--

CREATE TABLE IF NOT EXISTS `blocked` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `blocked_user` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(11) unsigned NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` tinyint(3) unsigned DEFAULT NULL,
  `id_event` tinyint(3) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `text`, `id_user`, `id_event`) VALUES
(1, 'El evento es el mejor evento que he ido en mi vida.', 6, 4),
(2, 'Estoy ansioso para que se vuelva a hacer el evento el próximo año.', 10, 4),
(6, 'Un post', 9, 5);

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE IF NOT EXISTS `conversation` (
  `id` int(11) NOT NULL,
  `time` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `time`) VALUES
(1, '2015-10-25'),
(11, '2015-11-05'),
(13, '2015-11-05'),
(14, '2015-11-05'),
(15, '2015-11-05');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) unsigned NOT NULL,
  `id_admin` tinyint(3) unsigned DEFAULT NULL,
  `place` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `id_admin`, `place`, `name`, `date`, `description`) VALUES
(1, 1, 'Cintermex', 'Feria del libro', '2015-11-02 06:09:38', 'This is a description, it can have a lot of words!'),
(2, 1, 'Cintermex', 'Expo tu Casa', '2015-11-06 06:09:39', 'This is a description, it can have a lot of words! This is a description, it can have a lot of words! This is a description, it can have a lot of words!'),
(5, 9, 'Mi Casa', 'WebDev Lab', '2015-11-20 20:15:00', 'Hola que hace');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `sender_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `conversation_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message`, `sender_id`, `time`, `conversation_id`) VALUES
(2, 'hola', 6, '2015-10-26 03:46:33', 1),
(14, 'Hola', 9, '2015-11-05 09:50:31', 11),
(16, '123123123123123', 9, '2015-11-05 10:46:34', 13),
(17, '12312312332153425', 9, '2015-11-05 10:46:49', 14),
(18, 'que pacho', 9, '2015-11-05 10:48:31', 11),
(19, '', 9, '2015-11-05 10:49:23', 11),
(20, 'hola como esta', 9, '2015-11-05 10:51:55', 15),
(21, '12312312', 9, '2015-11-05 10:52:12', 15),
(22, '12312321', 9, '2015-11-05 10:52:16', 15);

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE IF NOT EXISTS `participants` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`id`, `conversation_id`, `user_id`) VALUES
(2, 1, 6),
(27, 11, 9),
(28, 11, 10),
(31, 13, 9),
(32, 13, 7),
(33, 14, 9),
(34, 14, 10),
(35, 15, 9),
(36, 15, 10);

-- --------------------------------------------------------

--
-- Table structure for table `rsvp`
--

CREATE TABLE IF NOT EXISTS `rsvp` (
  `id` int(11) unsigned NOT NULL,
  `id_event` tinyint(3) unsigned DEFAULT NULL,
  `id_user` tinyint(3) unsigned DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rsvp`
--

INSERT INTO `rsvp` (`id`, `id_event`, `id_user`, `status`) VALUES
(1, 1, 3, 'going'),
(2, 2, 4, 'going');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(11) unsigned NOT NULL,
  `id_event` tinyint(1) unsigned DEFAULT NULL,
  `start_date` int(11) unsigned DEFAULT NULL,
  `end_date` int(11) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `id_event`, `start_date`, `end_date`, `name`, `description`) VALUES
(1, 1, 1448213400, 1448217000, 'Conferencia Magistral', 'This is a description, it can have a lot of words!');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `facebook_id` varchar(30) DEFAULT NULL,
  `twitter_id` varchar(30) DEFAULT NULL,
  `google_id` varchar(30) DEFAULT NULL,
  `company` varchar(20) DEFAULT NULL,
  `t_shirt_size` varchar(8) DEFAULT NULL,
  `food_preference` text,
  `special_needs` text,
  `language` text,
  `picture` varchar(80) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `modify_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `facebook_id`, `twitter_id`, `google_id`, `company`, `t_shirt_size`, `food_preference`, `special_needs`, `language`, `picture`, `role`, `modify_date`) VALUES
(6, 'Test3', 'Test3', 'test@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'user', '2015-11-05 09:14:56'),
(7, 'Test2', 'Test2', 'test2@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'user', NULL),
(9, 'Random', 'User', 'lol@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, 'ITESM', 'X-Large', 'TACOS', 'NONE', NULL, NULL, 'admin', '2015-11-05 04:56:11'),
(10, 'Pepito', 'Garza', 'pepito@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin', NULL),
(11, 'Juan', 'Gonzalez', 'jlo@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin', '2015-11-05 09:29:38'),
(13, 'este ', 'test', '123@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin', '2015-11-05 09:31:38'),
(14, 'Juan', 'Lorenzo', 'juan@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'user', '2015-11-05 09:56:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`user_id`),
  ADD KEY `blockedUser` (`blocked_user`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversationId` (`conversation_id`),
  ADD KEY `senderId` (`sender_id`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversation_id` (`conversation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `rsvp`
--
ALTER TABLE `rsvp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocked`
--
ALTER TABLE `blocked`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `rsvp`
--
ALTER TABLE `rsvp`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocked`
--
ALTER TABLE `blocked`
  ADD CONSTRAINT `blocked_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blocked_ibfk_2` FOREIGN KEY (`blocked_user`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
