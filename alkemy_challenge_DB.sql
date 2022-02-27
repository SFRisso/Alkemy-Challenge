-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2022 at 12:46 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alkemy_challenge`
--

-- --------------------------------------------------------

--
-- Table structure for table `generos`
--

CREATE TABLE `generos` (
  `genero_id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `generos`
--

INSERT INTO `generos` (`genero_id`, `nombre`, `imagen`, `createdAt`, `updatedAt`) VALUES
(1, 'Acción', 'img_accion.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(2, 'Ciencia ficción', 'img_ciencia_ficcion.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(3, 'Comedia', 'img_comedia.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(4, 'Drama', 'img_drama.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(5, 'Fantasía', 'img_fantasia.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(6, 'Melodrama', 'img_melodrama.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(7, 'Musical', 'img_musical.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(8, 'Romance', 'img_romance.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(9, 'Suspenso', 'img_suspenso.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(10, 'Terror', 'img_terror.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51'),
(11, 'Documental', 'img_documental.jpg', '2022-02-27 20:38:51', '2022-02-27 20:38:51');

-- --------------------------------------------------------

--
-- Table structure for table `pelis_series`
--

CREATE TABLE `pelis_series` (
  `peli_serie_id` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `calif` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pelis_series`
--

INSERT INTO `pelis_series` (`peli_serie_id`, `imagen`, `titulo`, `fecha_creacion`, `calif`, `createdAt`, `updatedAt`) VALUES
(1, 'img_Batman_Inicia.jpg', 'Batman inicia', '2005-06-10 23:01:03', 3, '2022-02-27 03:01:03', '2022-02-27 03:01:03'),
(2, 'img_batman_the_dark_knight.jpg', 'Batman: El caballero de la noche', '2008-07-14 23:01:03', 5, '2022-02-27 03:01:03', '2022-02-27 03:01:03'),
(3, 'img_señor_de_los_anillos1.jpg', 'El Señor de los Anillos: la Comunidad del Anillo', '2001-02-01 17:18:26', 4, '2022-02-27 21:18:26', '2022-02-27 21:18:26'),
(4, 'img_señor_de_los_anillos2.jpg', 'El Señor de los Anillos: las dos torres', '2002-01-01 17:19:52', 3, '2022-02-27 21:18:26', '2022-02-27 21:18:26'),
(5, 'img_señor_de_los_anillos3.jpg', 'El Señor de los Anillos: el retorno del Rey', '2003-01-01 17:40:59', 5, '2022-02-27 21:18:26', '2022-02-27 21:18:26'),
(6, 'img_duna.jpg', 'Duna', '2021-09-15 17:40:59', 4, '2022-02-27 21:18:26', '2022-02-27 21:18:26');

-- --------------------------------------------------------

--
-- Table structure for table `peli_series_personajes`
--

CREATE TABLE `peli_series_personajes` (
  `personaje_id` int(11) NOT NULL,
  `peli_serie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `peli_series_personajes`
--

INSERT INTO `peli_series_personajes` (`personaje_id`, `peli_serie_id`) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(3, 4),
(3, 5),
(4, 3),
(4, 4),
(4, 5),
(5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `peli_serie_genero`
--

CREATE TABLE `peli_serie_genero` (
  `genero_id` int(11) NOT NULL,
  `peli_serie_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `peli_serie_genero`
--

INSERT INTO `peli_serie_genero` (`genero_id`, `peli_serie_id`) VALUES
(1, 1),
(1, 2),
(2, 6),
(4, 1),
(4, 2),
(5, 3),
(5, 4),
(5, 5),
(9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `personajes`
--

CREATE TABLE `personajes` (
  `personaje_id` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `peso` int(11) DEFAULT NULL,
  `historia` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personajes`
--

INSERT INTO `personajes` (`personaje_id`, `imagen`, `nombre`, `edad`, `peso`, `historia`, `createdAt`, `updatedAt`) VALUES
(1, 'img_batman.jpg', 'Bruce Wayne / Batman', 35, 95, 'Un multimillonario que se dedica a proteger a Gotham City del mundo criminal como un vigilante nocturno con aspecto de murciélago.', '2022-02-27 03:07:27', '2022-02-27 03:26:05'),
(2, 'img_joker.jpg', ' Joker', 42, 70, 'Una maniática mente maestra del crimen que se describe a sí mismo como un «agente del caos», y se eleva al poder dominante aterrorizando a Gótica y sumiéndola en el caos.', '2022-02-27 03:07:27', '2022-02-27 03:07:27'),
(3, 'img_frodo.jpg', 'Frodo Bolsón', 33, 40, 'Frodo Bolsón es un hobbit, hijo de Drogo Bolsón y Prímula Brandigamo, nacido el 22 de septiembre de 2968 de la Tercera Edad del Sol. Llamado también \"Portador del Anillo\", Frodo fue el encargado de llevar el Anillo Único hasta el Monte del Destino.', '2022-02-27 21:50:49', '2022-02-27 21:50:49'),
(4, 'img_gandalf.jpg', 'Gandalf', 24000, 70, 'Gandalf es conocido por muchos nombres en la Tierra Media; según sus propias palabras: «Mithrandir entre los elfos, Tharkún para los enanos; Olórin era en mi juventud en el Oeste que nadie recuerda, Incánus en el Sur, Gandalf en el Norte;', '2022-02-27 21:50:49', '2022-02-27 21:50:49'),
(5, 'img_paul_atreides.jpg', 'Paul Atreides', 15, 55, 'Paul Atreides (conocido más tarde como Muad\'Dib)1​ es un personaje ficticio de la serie de ciencia ficción Dune creada por Frank Herbert. Es uno de los personajes principales de las novelas de la serie Dune, El mesías de Dune e Hijos de Dune. ', '2022-02-27 21:50:49', '2022-02-27 21:50:49');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(150) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `email`, `contraseña`, `createdAt`, `updatedAt`) VALUES
(1, 'Marcelo Tinelli', 'marcelo2022@gmail.com', '$2a$10$AsmjkEUwAjKLr4QnL.rYdejXMWYLgQ3zmUPW4iBonGQxdOwe5KYqq', '2022-02-27 17:53:41', '2022-02-27 17:53:41'),
(2, 'Leo Messi', 'messi2022@gmail.com', '$2a$10$nQSsozs6iwQBmqsi9PK4.eAjRz56V4X2sERoTJ9flS1S.hTSFYZvi', '2022-02-27 20:05:10', '2022-02-27 20:05:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`genero_id`);

--
-- Indexes for table `pelis_series`
--
ALTER TABLE `pelis_series`
  ADD PRIMARY KEY (`peli_serie_id`);

--
-- Indexes for table `peli_series_personajes`
--
ALTER TABLE `peli_series_personajes`
  ADD PRIMARY KEY (`personaje_id`,`peli_serie_id`),
  ADD KEY `peli_serie_id` (`peli_serie_id`);

--
-- Indexes for table `peli_serie_genero`
--
ALTER TABLE `peli_serie_genero`
  ADD PRIMARY KEY (`genero_id`,`peli_serie_id`),
  ADD KEY `peli_serie_id` (`peli_serie_id`);

--
-- Indexes for table `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`personaje_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `generos`
--
ALTER TABLE `generos`
  MODIFY `genero_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `pelis_series`
--
ALTER TABLE `pelis_series`
  MODIFY `peli_serie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `personajes`
--
ALTER TABLE `personajes`
  MODIFY `personaje_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `peli_series_personajes`
--
ALTER TABLE `peli_series_personajes`
  ADD CONSTRAINT `peli_series_personajes_ibfk_1` FOREIGN KEY (`personaje_id`) REFERENCES `personajes` (`personaje_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `peli_series_personajes_ibfk_2` FOREIGN KEY (`peli_serie_id`) REFERENCES `pelis_series` (`peli_serie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `peli_serie_genero`
--
ALTER TABLE `peli_serie_genero`
  ADD CONSTRAINT `peli_serie_genero_ibfk_1` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`genero_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `peli_serie_genero_ibfk_2` FOREIGN KEY (`peli_serie_id`) REFERENCES `pelis_series` (`peli_serie_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
