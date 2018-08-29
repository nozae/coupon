-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- 생성 시간: 18-08-28 06:53
-- 서버 버전: 5.7.19
-- PHP 버전: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `coupon`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `category`
--

INSERT INTO `category` (`categoryId`, `categoryName`) VALUES
(1, '카페'),
(2, '음식점'),
(3, '유흥'),
(4, '뷰티'),
(5, '기타');

-- --------------------------------------------------------

--
-- 테이블 구조 `coupon_config`
--

CREATE TABLE `coupon_config` (
  `couponId` int(11) NOT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampId` int(11) DEFAULT NULL,
  `couponPublishTerm` int(10) DEFAULT NULL,
  `couponItemName` varchar(40) DEFAULT NULL,
  `itemImgId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `coupon_config`
--

INSERT INTO `coupon_config` (`couponId`, `storeId`, `stampId`, `couponPublishTerm`, `couponItemName`, `itemImgId`) VALUES
(1, 1, 1, 5, '아메리카노', 1),
(2, 1, 1, 10, '수박주스', 2),
(3, 1, 2, 10, '군만두', 3),
(4, 1, 2, 20, '탕수육', 4);

-- --------------------------------------------------------

--
-- 테이블 구조 `coupon_list`
--

CREATE TABLE `coupon_list` (
  `coupon_list_id` int(11) NOT NULL,
  `stamp_save_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `coupon_id` int(11) DEFAULT NULL,
  `coupon_publish_date` varchar(50) DEFAULT NULL,
  `coupon_use_date` varchar(50) DEFAULT NULL,
  `coupon_finish_date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `item_img`
--

CREATE TABLE `item_img` (
  `itemImgId` int(11) NOT NULL,
  `imgCategory` varchar(45) DEFAULT NULL,
  `itemImg` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `item_img`
--

INSERT INTO `item_img` (`itemImgId`, `imgCategory`, `itemImg`) VALUES
(1, 'drink', 'drink_01'),
(2, 'drink', 'drink_02'),
(3, 'drink', 'drink_03'),
(4, 'drink', 'drink_04'),
(5, 'drink', 'drink_05'),
(6, 'drink', 'drink_06'),
(7, 'drink', 'drink_07'),
(8, 'food', 'food_01'),
(9, 'food', 'food_02'),
(10, 'food', 'food_03'),
(11, 'food', 'food_04'),
(12, 'food', 'food_05'),
(13, 'food', 'food_06'),
(14, 'food', 'food_07'),
(15, 'food', 'food_08'),
(16, 'food', 'food_09'),
(17, 'food', 'food_10'),
(18, 'food', 'food_11'),
(19, 'food', 'food_12');

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp`
--

CREATE TABLE `stamp` (
  `stampId` int(11) NOT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampTerm` varchar(40) DEFAULT NULL,
  `stampMaximum` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `stamp`
--

INSERT INTO `stamp` (`stampId`, `storeId`, `stampTerm`, `stampMaximum`) VALUES
(1, 1, '음료 1잔', 10),
(2, 1, '식사 1개', 20);

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp_save`
--

CREATE TABLE `stamp_save` (
  `stampSaveId` int(11) NOT NULL,
  `stampId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `storeId` int(11) DEFAULT NULL,
  `stampPublishDate` varchar(50) DEFAULT NULL,
  `stampFinishDate` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `stamp_save_history`
--

CREATE TABLE `stamp_save_history` (
  `stampSaveId` int(11) DEFAULT NULL,
  `stampSaveNo` int(10) DEFAULT NULL,
  `stampSaveDate` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `stats`
--

CREATE TABLE `stats` (
  `storeId` int(11) NOT NULL,
  `totalUsedUser` int(10) DEFAULT NULL,
  `inUseUser` int(10) DEFAULT NULL,
  `inStamp` int(10) DEFAULT NULL,
  `totalStamp` int(10) DEFAULT NULL,
  `publishedCoupon` int(10) DEFAULT NULL,
  `usedCoupon` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 테이블 구조 `store`
--

CREATE TABLE `store` (
  `storeId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `storeName` varchar(50) DEFAULT NULL,
  `storeRegistNo` int(50) DEFAULT NULL,
  `storePhone` varchar(50) DEFAULT NULL,
  `addressSi` varchar(20) DEFAULT NULL,
  `addressGu` varchar(20) DEFAULT NULL,
  `addressDong` varchar(20) DEFAULT NULL,
  `addressDetail` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `store`
--

INSERT INTO `store` (`storeId`, `userId`, `categoryId`, `storeName`, `storeRegistNo`, `storePhone`, `addressSi`, `addressGu`, `addressDong`, `addressDetail`) VALUES
(1, 5, 1, '우리동네 일등커피집', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호'),
(2, 6, 2, '놀부 부대찌개', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호'),
(3, 7, 3, '제노 PC방', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호'),
(4, 8, 4, '네일 맑음', 123456789, '02-1234-5678', '서울특별시', '강서구', '방화동', '123-4번지 1층 101호');

-- --------------------------------------------------------

--
-- 테이블 구조 `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `userType` int(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pw` varchar(255) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `barcode` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`userId`, `userType`, `email`, `pw`, `name`, `barcode`) VALUES
(1, 0, 'aaa1', 'qasw1234', 'aaa1_name', 'aaa1-barcode'),
(2, 0, 'aaa2', 'qasw1234', 'aaa2_name', 'aaa2-barcode'),
(3, 0, 'aaa3', 'qasw1234', 'aaa3_name', 'aaa3-barcode'),
(4, 0, 'aaa4', 'qasw1234', 'aaa4_name', 'aaa4-barcode'),
(5, 1, 'sss1', 'qasw1234', 'sss1_name', NULL),
(6, 1, 'sss2', 'qasw1234', 'sss2_name', NULL),
(7, 1, 'sss3', 'qasw1234', 'sss3_name', NULL),
(8, 1, 'sss4', 'qasw1234', 'sss4_name', NULL);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- 테이블의 인덱스 `coupon_config`
--
ALTER TABLE `coupon_config`
  ADD PRIMARY KEY (`couponId`);

--
-- 테이블의 인덱스 `coupon_list`
--
ALTER TABLE `coupon_list`
  ADD PRIMARY KEY (`coupon_list_id`);

--
-- 테이블의 인덱스 `item_img`
--
ALTER TABLE `item_img`
  ADD PRIMARY KEY (`itemImgId`);

--
-- 테이블의 인덱스 `stamp`
--
ALTER TABLE `stamp`
  ADD PRIMARY KEY (`stampId`);

--
-- 테이블의 인덱스 `stamp_save`
--
ALTER TABLE `stamp_save`
  ADD PRIMARY KEY (`stampSaveId`);

--
-- 테이블의 인덱스 `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`storeId`);

--
-- 테이블의 인덱스 `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`storeId`);

--
-- 테이블의 인덱스 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 테이블의 AUTO_INCREMENT `coupon_config`
--
ALTER TABLE `coupon_config`
  MODIFY `couponId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 테이블의 AUTO_INCREMENT `coupon_list`
--
ALTER TABLE `coupon_list`
  MODIFY `coupon_list_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 테이블의 AUTO_INCREMENT `item_img`
--
ALTER TABLE `item_img`
  MODIFY `itemImgId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- 테이블의 AUTO_INCREMENT `stamp_save`
--
ALTER TABLE `stamp_save`
  MODIFY `stampSaveId` int(11) NOT NULL AUTO_INCREMENT;
--
-- 테이블의 AUTO_INCREMENT `store`
--
ALTER TABLE `store`
  MODIFY `storeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- 테이블의 AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
