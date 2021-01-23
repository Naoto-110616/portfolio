-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 23, 2021 at 03:49 PM
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
(70, 'kkk', 'uploads/b3c3f1a24af9f4acf04cee68d87d468a7f075091.jpeg', 90, 0, '2021-01-21 18:20:50', '2021-01-21 09:20:50'),
(71, 'lkfjl;askdfj', 'uploads/bcbe1af090d9a7e86cafd95d7cf1b8c0fbfd873a.jpeg', 91, 0, '2021-01-22 21:23:42', '2021-01-22 12:23:42'),
(72, 'lkfajsd;', 'uploads/a327e34a53630bb37aaa68443dc3bd12277aeb33.jpeg', 91, 0, '2021-01-22 21:41:12', '2021-01-22 12:41:12'),
(73, 'jhyjhjk', 'uploads/244dbed7a627d8a7e3658c64ac8d201e78cd371c.jpeg', 91, 0, '2021-01-23 11:24:11', '2021-01-23 02:24:11');

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
  `profpic` varchar(255) DEFAULT NULL,
  `backgroundimg` varchar(255) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `age`, `tel`, `zip`, `addr`, `email`, `pass`, `profpic`, `backgroundimg`, `login_time`, `delete_flg`, `create_date`, `update_date`) VALUES
(56, 'eee', 21, '09000000000', '1920192', '109', 'eee@eee', '$2y$10$dSJ9btRWWt3kO49XNPQy5ug2nljyNKNhk.2UMoi/MRfZ6kq7u8CFO', NULL, NULL, '2021-01-18 13:16:47', 0, NULL, '2021-01-18 13:16:47'),
(89, NULL, NULL, NULL, NULL, NULL, 'www@www', '$2y$10$ogrVH5pSyaCKHbMKhcTQiu0Ku6gmSKPC0qYW6n.FJDTb0ztmYtWC2', NULL, NULL, '2021-01-21 16:06:22', 0, NULL, '2021-01-21 07:06:22'),
(90, 'okawa', 32, '09022223333', '3454445', '33333', 'siodeitadaku@gmail.com', '$2y$10$gCLOWSfdWT/WlSesSTKrdOEYzTpcCamIPiCnKDwo5MiP1EOb9NKXG', 'uploads/dde53637a7b584bf6b7a21f53d163f5fbf5c43fc.jpeg', NULL, '2021-01-21 16:09:15', 1, NULL, '2021-01-21 07:09:15'),
(91, 'okawa', 21, '0900000000', '1234567', '1234556', 'siodeitadaku@gmail.com', '$2y$10$i4XOEMLpgPa6cASsKikC6.0aqS/bSt8foW3dN5eyURRTVvsC8pw3S', 'uploads/5997d2c0c301d087561cee1e0b0df08775857bdd.jpeg', 'uploads/3434b05e6caed2409a2db81a6d081b9d8a6401ea.jpeg', '2021-01-21 18:24:07', 0, '2021-01-21 18:24:07', '2021-01-21 09:24:07'),
(92, NULL, NULL, NULL, NULL, NULL, 'ppp@ppp', '$2y$10$l0FrqqLwA0TJgR/3CLGjNuj0t4S37TtbEFrVTI9OlFb84z0a1bdsS', NULL, NULL, '2021-01-22 17:39:51', 0, '2021-01-22 17:39:51', '2021-01-22 08:39:51');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
