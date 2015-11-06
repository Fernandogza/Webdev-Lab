-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 13, 2014 at 10:18 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `grid`
--

CREATE TABLE IF NOT EXISTS `grid` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fname` varchar(600) NOT NULL,
  `lname` varchar(600) NOT NULL,
  `age` int(3) NOT NULL,
  `profession` varchar(400) NOT NULL,
  `posted_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `grid`
--

INSERT INTO `grid` (`id`, `fname`, `lname`, `age`, `profession`, `posted_date`) VALUES
(7, 'Bill', 'Gates ', 59, 'Software Architect', '2014-06-09'),
(8, 'Steve', 'Jobs', 56, 'Inventor', '2014-07-22'),
(9, 'Mark', 'Zuckerberg', 30, 'Entrepreneur', '2014-07-09'),
(10, 'John', 'Resig', 30, 'Programmer', '2014-07-29');
