-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- ホスト: localhost:3306
-- 生成日時: 2021 年 1 月 06 日 14:36
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
  `username` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `zip` text NOT NULL,
  `addr` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `login_time` datetime NOT NULL,
  `delete_flg` tinyint(1) NOT NULL DEFAULT '0',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`id`, `username`, `age`, `tel`, `zip`, `addr`, `email`, `pass`, `login_time`, `delete_flg`, `update_date`) VALUES
(36, '', 0, '', '0', '', 'rrrrr@rrrr', '$2y$10$1dXmz3tpo6dcUa6xi6yWTuNIVNhu2WLCcTT6tepr4wLxtbr5eH5p.', '2020-12-20 03:42:24', 0, '2020-12-29 14:50:34'),
(40, '', 0, '', '0', '', 'wwwww@www', '$2y$10$O6O7H5jtYwKDHoQqE8oSYOAEJi4gjcdNfjOB3DH28fV4xXUUPSOMa', '2020-12-20 20:49:39', 0, '2020-12-29 14:50:34'),
(41, 'qqqq', 43, '0667050742', '0011111', '杉並区', 'qqqqqq@qqq', '$2y$10$JjKp0nZWv7knSw3EtvUGyejBy/jsx4TGGaemct/bCdPLBxl0HbG2S', '2020-12-21 14:03:08', 0, '2020-12-29 14:50:34'),
(42, '', 0, '', '0', '', 'aaa@aaa', '$2y$10$F0atE22z5a5Z5uR/g/5KzeaWCxvWuUQddI4rfIQ9jaECrXDFZkvd6', '2020-12-21 14:46:31', 1, '2020-12-29 14:50:34'),
(44, '', 0, '', '0', '', 'tttt@ttt', '$2y$10$q6G/xTtNE1i7nka3Pfe5AOlqYSiOnAKZoc6VyMV6wVm99S7FhF/TK', '2020-12-21 17:18:02', 0, '2020-12-29 14:50:34'),
(45, '', 0, '', '0', '', 'ttt@ttt', '$2y$10$UpR07Y2xsMA8zCeg/belLuhc2O/vT80UVZxYkW6ZfC.8h3kCk/RK.', '2020-12-21 17:20:34', 0, '2020-12-29 14:50:34'),
(46, '', 0, '', '0', '', 'www@www', '$2y$10$Y0WeU6rOnyYEeZlmATDI8eodHq2F4VeQ3SDWEbTGnZpwaJjXctB1y', '2020-12-21 17:20:59', 1, '2020-12-29 14:50:34'),
(47, '', 0, '', '0', '', 'rrr@rrr', '$2y$10$RbyUm2PeWaqTxEOaEtzGXeOLRZ/eMbHyJc0ix0VeBmwwoZSOu.Bdi', '2020-12-23 19:15:18', 0, '2020-12-29 14:50:34'),
(48, '', 0, '', '0', '', 'rrrrr@rrr', '$2y$10$5uLZ6uFtriAoR391Jy6zhO7MCWgTqT1zRu.ME7TQIsSBIhBWzzgTO', '2020-12-23 19:18:06', 0, '2020-12-29 14:50:34'),
(49, '', 0, '', '0', '', 'qqqqqqqq@qqq', '$2y$10$o3HeIln1YKCxlpa8JbeExOyVn8cKn3jBtbNA9b.AGRINt.LJKby..', '2020-12-26 16:43:45', 0, '2020-12-29 14:50:34'),
(50, '', 0, '', '0', '', 'ssssssss@ssss', '$2y$10$tl8TCIUk6OxlpwdgfhU.Zeb.kTpMvxnpppMcVISXSUhA9os9XSlXG', '2020-12-26 16:51:37', 0, '2020-12-29 14:50:34'),
(51, 'okawa', 21, '09050193951', '5470011', '長吉出戸8-10-1-701', 'siodeitadaku@gmail.com', '$2y$10$nh0Yn67s4P7t5lbiB9lY9.toVQaw8z/SED.Zy4v89IQ90txgds4xm', '2020-12-27 23:02:57', 0, '2020-12-29 14:50:34');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
