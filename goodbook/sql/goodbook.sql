-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 19, 2021 at 10:15 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `goodbook`
--
CREATE DATABASE IF NOT EXISTS `goodbook` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `goodbook`;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `pic1` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` datetime NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `comment`, `pic1`, `user_id`, `delete_flg`, `create_date`, `update_date`) VALUES
(6, 'aaa', '', 51, 0, '2021-01-19 21:33:27', '2021-01-19 12:33:27'),
(7, 'aaa', '', 51, 0, '2021-01-19 21:34:58', '2021-01-19 12:34:58'),
(8, 'aaa', '', 51, 0, '2021-01-19 21:37:45', '2021-01-19 12:37:45'),
(9, 'utada hikaru', '', 51, 0, '2021-01-19 21:49:27', '2021-01-19 12:49:27'),
(10, 'aaa', '', 51, 0, '2021-01-19 21:50:29', '2021-01-19 12:50:29'),
(11, 'fff', '', 51, 0, '2021-01-19 21:51:14', '2021-01-19 12:51:14'),
(12, 'sdlfkjals;kdf', '', 51, 0, '2021-01-19 21:54:26', '2021-01-19 12:54:26'),
(13, 'kjlkj', '', 51, 0, '2021-01-19 22:00:55', '2021-01-19 13:00:55'),
(14, 'fasdfl;kajsdl;kfjal;ksdjf', '', 51, 0, '2021-01-19 22:02:23', '2021-01-19 13:02:23'),
(15, 'fasdflkjasl;kdfjasfsadfasdf', 'uploads/7922725a89679a8edd8c7812a5ac88104667c603.jpeg', 51, 0, '2021-01-19 22:07:07', '2021-01-19 13:07:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `zip` text,
  `addr` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `login_time` datetime NOT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `profPic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `age`, `tel`, `zip`, `addr`, `email`, `pass`, `login_time`, `delete_flg`, `update_date`, `profPic`) VALUES
(51, 'okawa', 21, '09050193951', '5470011', '長吉出戸8-10-1-701', 'siodeitadaku@gmail.com', '$2y$10$Hv9X9pYNMUjcrT6FPpGPseeVSa6FM1wfjA8Cr0915KO/8nchPrU1q', '2020-12-27 23:02:57', 0, '2020-12-29 14:50:34', ''),
(55, 'aa', 21, '09010101010', '1001100', 'aaaa', 'aaa@aaa', '$2y$10$JqEnKTEVRIRvpdsaFa5iu.fAlOs2HC3fjfC8/GHaCZI1V79YMjjum', '2021-01-18 20:38:55', 1, '2021-01-18 11:38:55', ''),
(56, 'eee', 21, '09000000000', '1920192', '109', 'eee@eee', '$2y$10$dSJ9btRWWt3kO49XNPQy5ug2nljyNKNhk.2UMoi/MRfZ6kq7u8CFO', '2021-01-18 13:16:47', 0, '2021-01-18 13:16:47', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
