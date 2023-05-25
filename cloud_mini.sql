-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2023 年 04 月 23 日 08:11
-- 伺服器版本： 10.4.21-MariaDB
-- PHP 版本： 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `cloud_mini`
--

-- --------------------------------------------------------

--
-- 資料表結構 `resource`
--

CREATE TABLE `resource` (
  `node` varchar(10) NOT NULL,
  `cpu` int(11) NOT NULL,
  `mem` int(11) NOT NULL,
  `work1` varchar(20) NOT NULL,
  `work2` varchar(20) NOT NULL,
  `work3` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `resource`
--

INSERT INTO `resource` (`node`, `cpu`, `mem`, `work1`, `work2`, `work3`) VALUES
('c1', 20, 15, 'python', 'mango', 'fork'),
('c2', 60, 40, 'mango', 'pison', 'usj'),
('c3', 26, 14, 'minions', 'potter', 'chrome');

-- --------------------------------------------------------

--
-- 資料表結構 `schedule`
--

CREATE TABLE `schedule` (
  `timestamp` int(11) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'false',
  `c1` varchar(10) NOT NULL DEFAULT 'false',
  `c2` varchar(10) NOT NULL DEFAULT 'false',
  `c3` varchar(10) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `schedule`
--

INSERT INTO `schedule` (`timestamp`, `status`, `c1`, `c2`, `c3`) VALUES
(214817, '123', 'true', 'true', 'true'),
(215108, '123', 'true', 'true', 'true'),
(215137, 'false', 'true', 'running', 'false');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`node`);

--
-- 資料表索引 `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`timestamp`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
