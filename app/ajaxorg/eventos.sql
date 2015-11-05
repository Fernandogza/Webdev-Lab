-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-11-2015 a las 02:41:27
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `sistema_eventos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `fname` varchar(600) NOT NULL,
  `ldescription` varchar(1600) NOT NULL,
  `lplace` varchar(600) NOT NULL,
  `hour` varchar(400) NOT NULL,
  `posted_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `fname`, `ldescription`, `lplace`, `hour`, `posted_date`) VALUES
(7, 'Expo tu casa', 'Encuentra todo para tu hogar ', 'Monterrey', '8:30 am', '2015-11-09'),
(8, 'Moroleon', 'Ropa y calzado', 'Cintermex', '10:30 am', '2016-07-22'),
(9, 'Feria del libro', 'Libros', 'Cintermex', '9:00 am', '2016-07-09'),
(10, 'ComicCon', 'Convencion de comics', 'San Diego', '3:00 pm', '2016-07-29');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
