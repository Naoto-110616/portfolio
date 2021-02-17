-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 17, 2021 at 03:42 PM
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
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` datetime NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id`, `name`, `delete_flg`, `create_date`, `update_date`) VALUES
(1, 'North America', 0, '2021-01-28 14:40:05', '2021-01-28 05:40:30'),
(2, 'Latin America', 0, '2021-01-28 14:40:42', '2021-01-28 05:40:53'),
(3, 'Europe', 0, '2021-01-28 14:41:14', '2021-01-28 05:41:32'),
(4, 'Oceania', 0, '2021-01-28 14:41:34', '2021-01-28 05:41:48'),
(5, 'Africa', 0, '2021-01-28 14:41:51', '2021-01-28 05:42:07'),
(6, 'Middle East', 0, '2021-01-28 14:42:36', '2021-01-28 05:42:45'),
(7, 'Asia', 0, '2021-01-28 14:42:47', '2021-01-28 05:42:56');

-- --------------------------------------------------------

--
-- Table structure for table `bord`
--

CREATE TABLE `bord` (
  `id` int(11) NOT NULL,
  `send_user` int(11) NOT NULL,
  `receive_user` int(11) NOT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` datetime NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bord`
--

INSERT INTO `bord` (`id`, `send_user`, `receive_user`, `delete_flg`, `create_date`, `update_date`) VALUES
(1, 91, 251, 0, '2021-02-16 19:55:50', '2021-02-16 10:55:50'),
(2, 91, 251, 0, '2021-02-16 19:57:39', '2021-02-16 10:57:39'),
(3, 91, 251, 0, '2021-02-16 20:21:59', '2021-02-16 11:21:59'),
(4, 91, 251, 0, '2021-02-16 20:33:07', '2021-02-16 11:33:07'),
(5, 91, 251, 0, '2021-02-16 20:34:25', '2021-02-16 11:34:25'),
(6, 91, 251, 0, '2021-02-16 20:44:59', '2021-02-16 11:44:59'),
(7, 91, 251, 0, '2021-02-16 20:45:49', '2021-02-16 11:45:49'),
(8, 91, 251, 0, '2021-02-16 20:47:34', '2021-02-16 11:47:34'),
(9, 91, 249, 0, '2021-02-16 20:47:43', '2021-02-16 11:47:43'),
(10, 91, 250, 0, '2021-02-16 20:52:41', '2021-02-16 11:52:41'),
(11, 91, 247, 0, '2021-02-16 20:54:45', '2021-02-16 11:54:45'),
(12, 91, 248, 0, '2021-02-16 20:55:16', '2021-02-16 11:55:16'),
(13, 91, 251, 0, '2021-02-16 20:56:01', '2021-02-16 11:56:01'),
(14, 251, 91, 0, '2021-02-16 20:56:52', '2021-02-16 11:56:52'),
(15, 251, 251, 0, '2021-02-16 20:56:59', '2021-02-16 11:56:59'),
(16, 251, 247, 0, '2021-02-16 21:00:50', '2021-02-16 12:00:50'),
(17, 91, 251, 0, '2021-02-16 21:03:09', '2021-02-16 12:03:09'),
(18, 91, 250, 0, '2021-02-17 14:04:30', '2021-02-17 05:04:30'),
(19, 91, 93, 0, '2021-02-17 15:09:07', '2021-02-17 06:09:07');

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
(106, 'せわしない日々、結果を残せていない自分。見て見ぬフリをしていた焦燥感や劣等感を、おばあちゃんの言葉が優しく射抜きます。\r\n「秋まで待てば、美しい花を咲かせる　だから焦らないで」', 'uploads/555ce403ccb9156717e46618b9b6be35bc9161ed.jpeg', 249, 0, '2021-02-15 21:40:01', '2021-02-15 12:40:01'),
(107, '心機一転、田舎に引っ越してきた女子高生。\r\nところが彼女を待っていたのは、予想外の裏切り、不可解な現象の数々、そして呪われた秘密…\r\nあなたには、30年前の惨劇の真相を ...', 'uploads/82aa0ff5e6623d4292ab7c66ec62768aab437b17.jpeg', 249, 0, '2021-02-15 21:42:14', '2021-02-15 12:42:14'),
(108, '【Amazon Music の活用法】\r\nお好きな楽曲をもとにしたレコメンド機能、シーンやジャンルが豊富なプレイリスト、ミュージックビデオ、そしてポッドキャストが聴けたりLive配信を視聴したり\r\nAmazon Music の Webサイト&アプリ を使いこなして日常で音楽やカルチャーを楽しもう', 'uploads/7533805ebd7191e41385f3b11c9b9d96e7eb0a36.jpeg', 250, 0, '2021-02-15 21:50:38', '2021-02-15 12:50:38'),
(109, '著者近影(息子作) Most recent likeness of me courtesy of my son', 'uploads/cbfca50300053654064d4ca8face747be827439d.jpeg', 251, 0, '2021-02-15 22:08:46', '2021-02-15 13:08:46');

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
  `area_id` int(11) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `create_date` datetime DEFAULT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `age`, `tel`, `zip`, `addr`, `email`, `pass`, `profpic`, `backgroundimg`, `area_id`, `login_time`, `delete_flg`, `create_date`, `update_date`) VALUES
(90, 'okawa', 32, '09022223333', '3454445', '33333', 'siodeitadaku@gmail.com', '$2y$10$gCLOWSfdWT/WlSesSTKrdOEYzTpcCamIPiCnKDwo5MiP1EOb9NKXG', 'uploads/dde53637a7b584bf6b7a21f53d163f5fbf5c43fc.jpeg', NULL, 0, '2021-01-21 16:09:15', 1, NULL, '2021-01-21 07:09:15'),
(91, 'okawa', 21, '0900000000', '1234567', '1234556', 'siodeitadaku@gmail.com', '$2y$10$i4XOEMLpgPa6cASsKikC6.0aqS/bSt8foW3dN5eyURRTVvsC8pw3S', 'uploads/f0c1253bb862eae72e9406650eaa41501541d201.jpeg', 'uploads/bcbe1af090d9a7e86cafd95d7cf1b8c0fbfd873a.jpeg', 7, '2021-01-21 18:24:07', 0, '2021-01-21 18:24:07', '2021-01-21 09:24:07'),
(93, 'aaa', 33, '09000000000', '1234567', '1234', 'aaa@aaa', '$2y$10$OyPilT4gk00UFKyljvh.1uEKsKxrtLatzMj0czaaj2fYH/68V.sD.', 'uploads/244dbed7a627d8a7e3658c64ac8d201e78cd371c.jpeg', 'uploads/296523f0bf761887fc99e44784472adbeef8a970.jpeg', 2, '2021-01-29 13:06:23', 0, '2021-01-29 13:06:23', '2021-01-29 04:06:23'),
(94, 'ppp', 44, '09000000000', '1234567', '12233', 'ppp@ppp', '$2y$10$sV/ZsIgENttWVQanpDyLCOhcFRRPa5dB5hl9UJujWqUtPcbZWjWku', 'uploads/7922725a89679a8edd8c7812a5ac88104667c603.jpeg', 'uploads/a327e34a53630bb37aaa68443dc3bd12277aeb33.jpeg', 2, '2021-01-29 13:08:34', 1, '2021-01-29 13:08:34', '2021-01-29 04:08:34'),
(95, 'uuu', 55, '09000000000', '1234567', '123', 'uuuu@uuu', '$2y$10$vOXfuNha9hJVzDsUU/vyJu8xLejNmY4IMQ9UO6ftYDBl1Ofw8HZmi', 'uploads/5997d2c0c301d087561cee1e0b0df08775857bdd.jpeg', NULL, 3, '2021-01-29 13:11:24', 0, '2021-01-29 13:11:24', '2021-01-29 04:11:24'),
(96, 'www', 21, '09000000000', '1234567', '123', 'www@www', '$2y$10$IgYjM.pk.YtVx1ClU50v6.nXVrwPw7aVmo5ZWn5n/meJ3PmVVFKgy', 'uploads/dc738d2e420b0daf0f39538daa47db9f75c23184.jpeg', NULL, 6, '2021-01-29 14:11:11', 1, '2021-01-29 14:11:11', '2021-01-29 05:11:11'),
(247, 'ddd', 98, '09000000000', '5470011', '701', 'ddd@ddd', '$2y$10$lrOd0ZY72K0C8dMTnCKZ1.k5TKTXD0iWUGQ2vrT3GsmOzzCE8Krr6', 'uploads/f0e578aec611c1483fc421a380c9eea1f045afda.jpeg', NULL, 5, '2021-02-03 12:01:52', 0, '2021-02-03 12:01:52', '2021-02-03 03:01:52'),
(248, 'test', 4, '09000000000', '4444444', '4444', 'ggg@ggg', '$2y$10$x0rE0sJ.LmuMOvJSWmxvIuTer6yxPSHzTe7XnpgK2wFWrEANumjwG', 'uploads/f69cd8b6b4078b4915b12e5e13a8703e2ac3c3e7.jpeg', NULL, 2, '2021-02-12 20:17:34', 0, '2021-02-12 20:17:34', '2021-02-12 11:17:34'),
(249, 'NETFLIX', 23, '0000000000', '0000000', 'カリフォルニア州ロスガトス', 'netfilix@com', '$2y$10$PjtT0O6jVlkmnTDpt4.pMON7oqudaDQz1mrEAmURUMfmmBDyXQAsG', 'uploads/cc80a3060fe07dadc1303565c773b493f9dfbe13.jpeg', 'uploads/12389c91e31a4d1b10868b72ae828c2b8895aad8.jpeg', 1, '2021-02-15 21:32:57', 0, '2021-02-15 21:32:57', '2021-02-15 12:32:57'),
(250, 'Amazon', 26, '01012069220880', '0000000', 'テリー・アベニュー・ノース410', 'amazon@com', '$2y$10$xJm7utGHRMbrP9Q3GL.iN./1K5mVDD/zaCnzwM2RerUZKIImT.gwe', 'uploads/d6cf47daf754fe3eb7f4ec59dbdc99475651938b.jpeg', 'uploads/74c82f6cd59ed9bc08f0e8e8bde6c22f95687ae2.jpeg', 1, '2021-02-15 21:43:13', 0, '2021-02-15 21:43:13', '2021-02-15 12:43:13'),
(251, 'Hikaru Utada', 38, '0000000000', '0000000', '0000000', 'utada@hikaru', '$2y$10$rDDov34H2DXFibbeyzrIOuwi3Pc3xn3Ol9b4YYzdvWhP.6P99Un72', 'uploads/5a4090231dc827059b801f2a8240662830726018.jpeg', 'uploads/dacfc3a86d96f8ef74f78feb0c5cf52ae9df3e42.jpeg', 3, '2021-02-15 21:56:09', 0, '2021-02-15 21:56:09', '2021-02-15 12:56:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bord`
--
ALTER TABLE `bord`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bord`
--
ALTER TABLE `bord`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;