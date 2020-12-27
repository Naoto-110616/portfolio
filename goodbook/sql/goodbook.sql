-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost:3306
-- 生成日時: 2020 年 12 月 26 日 20:15
-- サーバのバージョン： 5.7.30
-- PHP のバージョン: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- データベース: `goodbook`
--
CREATE DATABASE IF NOT EXISTS `goodbook` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `goodbook`;

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `login_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`id`, `email`, `pass`, `delete_flg`, `login_time`) VALUES
(35, 'yyy@yyy', '$2y$10$RSeeTS9.VasGYWBYOCww4O/UYX9WR.MBl3jBGgNofFWtbbyTsEwsa', 0, '2020-12-19 12:56:15'),
(36, 'rrrrr@rrrr', '$2y$10$1dXmz3tpo6dcUa6xi6yWTuNIVNhu2WLCcTT6tepr4wLxtbr5eH5p.', 0, '2020-12-20 03:42:24'),
(37, 'uuuu@uuu', '$2y$10$tw1U/at7aSnsshQ6GyoOxecpPh7ir6wuecqO7qGvKP9yTTtdk683C', 0, '2020-12-20 03:43:22'),
(40, 'wwwww@www', '$2y$10$O6O7H5jtYwKDHoQqE8oSYOAEJi4gjcdNfjOB3DH28fV4xXUUPSOMa', 0, '2020-12-20 20:49:39'),
(41, 'qqqqqq@qqq', '$2y$10$JjKp0nZWv7knSw3EtvUGyejBy/jsx4TGGaemct/bCdPLBxl0HbG2S', 0, '2020-12-21 14:03:08'),
(42, 'aaa@aaa', '$2y$10$F0atE22z5a5Z5uR/g/5KzeaWCxvWuUQddI4rfIQ9jaECrXDFZkvd6', 0, '2020-12-21 14:46:31'),
(43, 'siodeitadaku@gmail.com', '$2y$10$kCpZqGcu4r/zBwVeJ.vxdedogLEA.oGo7HA5.a2QCfsMNQxJgkOwy', 0, '2020-12-21 15:25:34'),
(44, 'tttt@ttt', '$2y$10$q6G/xTtNE1i7nka3Pfe5AOlqYSiOnAKZoc6VyMV6wVm99S7FhF/TK', 0, '2020-12-21 17:18:02'),
(45, 'ttt@ttt', '$2y$10$UpR07Y2xsMA8zCeg/belLuhc2O/vT80UVZxYkW6ZfC.8h3kCk/RK.', 0, '2020-12-21 17:20:34'),
(46, 'www@www', '$2y$10$Y0WeU6rOnyYEeZlmATDI8eodHq2F4VeQ3SDWEbTGnZpwaJjXctB1y', 0, '2020-12-21 17:20:59'),
(47, 'rrr@rrr', '$2y$10$RbyUm2PeWaqTxEOaEtzGXeOLRZ/eMbHyJc0ix0VeBmwwoZSOu.Bdi', 0, '2020-12-23 19:15:18'),
(48, 'rrrrr@rrr', '$2y$10$5uLZ6uFtriAoR391Jy6zhO7MCWgTqT1zRu.ME7TQIsSBIhBWzzgTO', 0, '2020-12-23 19:18:06'),
(49, 'qqqqqqqq@qqq', '$2y$10$o3HeIln1YKCxlpa8JbeExOyVn8cKn3jBtbNA9b.AGRINt.LJKby..', 0, '2020-12-26 16:43:45'),
(50, 'ssssssss@ssss', '$2y$10$tl8TCIUk6OxlpwdgfhU.Zeb.kTpMvxnpppMcVISXSUhA9os9XSlXG', 0, '2020-12-26 16:51:37');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
