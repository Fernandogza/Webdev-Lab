-- phpMyAdmin SQL Dump
-- version 4.4.13.1
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Nov 25, 2015 at 05:02 PM
-- Server version: 5.6.26
-- PHP Version: 5.5.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(11) unsigned NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` tinyint(3) unsigned DEFAULT NULL,
  `id_event` tinyint(3) unsigned DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `text`, `id_user`, `id_event`) VALUES
(1, 'El evento es el mejor evento que he ido en mi vida.', 6, 4),
(2, 'Estoy ansioso para que se vuelva a hacer el evento el próximo año.', 10, 4),
(8, 'Que padre', 21, 1),
(9, 'materialize <3\n', 20, 5),
(10, 'probando', 20, 7),
(11, 'asdfasdf', 0, 7);

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE IF NOT EXISTS `conversation` (
  `id` int(11) NOT NULL,
  `time` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `time`) VALUES
(21, '2015-11-25');

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
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `lon` double DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `id_admin`, `place`, `name`, `date`, `description`, `lat`, `lon`) VALUES
(1, 1, 'Cintermex', 'Feria del libro', '2015-11-02 06:09:38', 'This is a description, it can have a lot of words!', 25.6781737, -100.28790240000001),
(2, 1, 'Cintermex', 'Expo tu Casa', '2015-11-06 06:09:39', 'This is a description, it can have a lot of words! This is a description, it can have a lot of words! This is a description, it can have a lot of words!', 25.6781737, -100.28790240000001),
(5, 9, 'Tecnologico de monterrey, Monterrey', 'WebDev Lab', '2015-11-20 20:15:00', 'Hola que hace', 25.651933, -100.2894607),
(6, 9, 'cintermex', 'Evento Prueba', '2015-11-18 20:15:00', 'Evento prueba...', 25.6781737, -100.28790240000001),
(7, 19, 'ITESM', 'Presentacion Proyecto', '2015-11-21 20:15:00', 'Presentacion del proyecto de Eventos', 25.4482833, -100.97529079999998);

-- --------------------------------------------------------

--
-- Table structure for table `eventimg`
--

CREATE TABLE IF NOT EXISTS `eventimg` (
  `id` int(11) unsigned NOT NULL,
  `id_event` tinyint(3) unsigned DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `eventimg`
--

INSERT INTO `eventimg` (`id`, `id_event`, `url`) VALUES
(1, 5, '/web/img/eventsImg/564069ae47073.jpg'),
(2, 5, '/web/img/eventsImg/manzana.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `eventtitlepic`
--

CREATE TABLE IF NOT EXISTS `eventtitlepic` (
  `id_event` tinyint(3) unsigned DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `eventtitlepic`
--

INSERT INTO `eventtitlepic` (`id_event`, `url`) VALUES
(5, '/web/img/eventsImg/manzana.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `mappositions`
--

CREATE TABLE IF NOT EXISTS `mappositions` (
  `eventID` int(11) unsigned NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `featType` char(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mappositions`
--

INSERT INTO `mappositions` (`eventID`, `lat`, `lng`, `featType`) VALUES
(1, 25.699, -100.28790240000001, 'info'),
(1, 25.6781737, -100.28790240000001, 'info'),
(1, 28.6781737, -100.28790240000001, 'info'),
(1, 25.6781737, -100.28790240000001, 'info');

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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message`, `sender_id`, `time`, `conversation_id`) VALUES
(37, 'Hola!!', 19, '2015-11-25 21:48:25', 21),
(38, 'Probando', 19, '2015-11-25 22:01:40', 21),
(39, 'otro mshjhdfhg', 19, '2015-11-25 22:01:46', 21),
(40, 'asdf asd  ', 19, '2015-11-25 22:01:51', 21),
(41, 'asdf asdf', 19, '2015-11-25 22:01:56', 21),
(42, 'asdfasd ', 19, '2015-11-25 22:02:02', 21);

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE IF NOT EXISTS `participants` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`id`, `conversation_id`, `user_id`) VALUES
(47, 21, 19),
(48, 21, 18);

-- --------------------------------------------------------

--
-- Table structure for table `personalschedule`
--

CREATE TABLE IF NOT EXISTS `personalschedule` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `start_date` int(11) NOT NULL,
  `end_date` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `id_conference` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personalschedule`
--

INSERT INTO `personalschedule` (`id`, `id_user`, `start_date`, `end_date`, `name`, `description`, `id_conference`) VALUES
(1, 20, 1448213400, 1448217000, 'LoL', 'GG', 1),
(2, 20, 1448213400, 1448217000, 'Conferencia Magistral', 'This is a description, it can have a lot of words!', 2),
(3, 27, 1448213400, 1448217000, 'Conferencia Magistral', 'This is a description, it can have a lot of words!', 2),
(4, 28, 1448213400, 1448217000, 'Conferencia Magistral', 'This is a description, it can have a lot of words!', 3),
(5, 29, 1448213400, 1448217000, 'Conferencia Magistral', 'This is a description, it can have a lot of words!', 3);

-- --------------------------------------------------------

--
-- Table structure for table `rsvp`
--

CREATE TABLE IF NOT EXISTS `rsvp` (
  `id` int(11) unsigned NOT NULL,
  `id_event` tinyint(3) unsigned DEFAULT NULL,
  `id_user` tinyint(3) unsigned DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rsvp`
--

INSERT INTO `rsvp` (`id`, `id_event`, `id_user`, `status`) VALUES
(1, 1, 3, 'going'),
(2, 2, 4, 'going'),
(3, 1, 20, 'going'),
(4, 5, 20, 'maybe'),
(5, 2, 20, 'not going'),
(6, 1, 20, 'going'),
(7, 1, 20, 'not going'),
(8, 1, 20, 'going'),
(9, 1, 20, 'going'),
(10, 7, 0, 'going'),
(11, 7, 20, 'going'),
(12, 7, 27, 'going'),
(13, 7, 28, 'going'),
(14, 7, 29, 'going'),
(15, 7, 30, 'going'),
(16, 7, 31, 'going'),
(17, 7, 32, 'going'),
(18, 7, 33, 'going'),
(19, 7, 34, 'going'),
(20, 7, 35, 'going'),
(21, 7, 36, 'going'),
(22, 7, 37, 'going'),
(23, 7, 38, 'going'),
(24, 7, 39, 'going'),
(25, 7, 30, 'going'),
(26, 7, 30, 'going'),
(27, 7, 32, 'going'),
(28, 7, 33, 'going'),
(29, 7, 34, 'going'),
(30, 7, 35, 'going'),
(31, 7, 36, 'going'),
(32, 7, 37, 'going'),
(33, 7, 38, 'going'),
(34, 7, 39, 'going'),
(35, 7, 18, 'going'),
(36, 7, 18, 'going'),
(37, 7, 18, 'going'),
(38, 7, 18, 'going'),
(39, 7, 18, 'going'),
(40, 7, 18, 'going'),
(41, 7, 18, 'going'),
(42, 7, 18, 'going'),
(43, 7, 18, 'going'),
(44, 7, 18, 'going'),
(45, 7, 18, 'going'),
(46, 7, 18, 'going'),
(47, 7, 18, 'going'),
(48, 7, 18, 'going'),
(49, 7, 40, 'going'),
(50, 7, 41, 'going'),
(51, 7, 42, 'going'),
(52, 7, 43, 'going'),
(53, 7, 44, 'going'),
(54, 7, 45, 'going'),
(55, 7, 46, 'going'),
(56, 7, 47, 'going'),
(57, 7, 48, 'going'),
(58, 7, 49, 'going');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `id_event`, `start_date`, `end_date`, `name`, `description`) VALUES
(1, 1, 1448213400, 1448217000, 'Conferencia Magistral', 'This is a description, it can have a lot of words!'),
(2, 1, 1448213400, 1448217000, 'Conferencia Magistral', 'This is a description, it can have a lot of words!'),
(3, 1, 1448214420, 1448215030, 'Conferencia Magistral', 'This is a description, it can have a lot of words!'),
(4, 1, 1448216460, 1448217070, 'Conferencia Magistral', 'This is a description, it can have a lot of words!'),
(5, 1, 1448218500, 1448219600, 'Conferencia Magistral', 'This is a description, it can have a lot of words!');

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
  `picture` varchar(80) DEFAULT '/web/img/profilePics/unknown.jpg',
  `role` varchar(255) DEFAULT NULL,
  `modify_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `facebook_id`, `twitter_id`, `google_id`, `company`, `t_shirt_size`, `food_preference`, `special_needs`, `language`, `picture`, `role`, `modify_date`) VALUES
(18, 'Fernando', 'Garza Conde', 'fernandogarzaconde@gmail.com', '963f4557f5d4d004d0cfca120cbf4829', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'admin', '2015-11-07 20:33:17'),
(19, 'Administrador', 'Eventos-App', 'lol@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, '', 'Small', '', '', NULL, '/web/img/profilePics/unknown.jpg', 'admin', '2015-11-25 15:13:08'),
(20, 'Jesús', 'Cena', 'a01191305@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, 'Microsoft', 'Small', 'Burritos', 'Wife', NULL, '/web/img/profilePics/20.jpg', 'user', '2015-11-23 14:03:36'),
(21, 'juan', 'gonzalez', 'a01190381@itesm.mx', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/21.jpg', 'user', '2015-11-09 00:04:56'),
(24, 'Test', 'Test2', 'a01123@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-22 02:27:10'),
(25, 'Fernando', 'Garza', 'fernandogarzac@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-22 02:41:18'),
(26, 'Yes', 'No', '1191305@itesm', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-22 02:41:18'),
(27, 'Prueba', 'Prueba1', 'prueba1@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 13:19:14'),
(28, 'Prueba', 'Prueba2', 'prueba2@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 13:19:14'),
(29, 'Prueba', 'Prueba3', 'prueba3@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 13:19:14'),
(30, 'Test1', 'Test1', 'test@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:19'),
(31, 'Test1', 'Test1', 'test2@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:20'),
(32, 'Test1', 'Test1', 'test3@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:20'),
(33, 'Test1', 'Test1', 'test4@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:20'),
(34, 'Test1', 'Test1', 'test5@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:20'),
(35, 'Test1', 'Test1', 'test6@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:20'),
(36, 'Test1', 'Test1', 'test7@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:20'),
(37, 'Test1', 'Test1', 'test8@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:20'),
(38, 'Test1', 'Test1', 'test9@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:21'),
(39, 'Test1', 'Test1', 'test10@itesm.mx', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-23 14:23:21'),
(40, 'Test1', 'Compania', 'test1@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:08'),
(41, 'Test2', 'Compania', 'test2@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:08'),
(42, 'Test3', 'Compania', 'test3@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09'),
(43, 'Test4', 'Compania', 'test4@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09'),
(44, 'Test5', 'Compania', 'test5@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09'),
(45, 'Test6', 'Compania', 'test6@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09'),
(46, 'Test7', 'Compania', 'test7@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09'),
(47, 'Test8', 'Compania', 'test8@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09'),
(48, 'Test9', 'Compania', 'test9@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09'),
(49, 'Test10', 'Compania', 'test10@compania.com', '5f4dcc3b5aa765d61d8327deb882cf99', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/web/img/profilePics/unknown.jpg', 'user', '2015-11-25 17:20:09');

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
-- Indexes for table `eventimg`
--
ALTER TABLE `eventimg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mappositions`
--
ALTER TABLE `mappositions`
  ADD KEY `eventID` (`eventID`);

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
-- Indexes for table `personalschedule`
--
ALTER TABLE `personalschedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_conference` (`id_conference`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `eventimg`
--
ALTER TABLE `eventimg`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=49;
--
-- AUTO_INCREMENT for table `personalschedule`
--
ALTER TABLE `personalschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `rsvp`
--
ALTER TABLE `rsvp`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=50;
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
-- Constraints for table `mappositions`
--
ALTER TABLE `mappositions`
  ADD CONSTRAINT `mappositions_ibfk_1` FOREIGN KEY (`eventID`) REFERENCES `event` (`id`) ON DELETE CASCADE;

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

--
-- Constraints for table `personalschedule`
--
ALTER TABLE `personalschedule`
  ADD CONSTRAINT `personalschedule_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
