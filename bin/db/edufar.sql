-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 30, 2018 at 07:36 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edufar`
--

-- --------------------------------------------------------

--
-- Table structure for table `ef_students`
--

CREATE TABLE `ef_students` (
  `s_id` int(10) NOT NULL,
  `s_guardian` int(10) NOT NULL,
  `s_name` varchar(100) NOT NULL,
  `s_standard` varchar(100) NOT NULL,
  `s_school` varchar(100) NOT NULL,
  `s_meedium` enum('MALAYALAM','ENGLISH') NOT NULL,
  `s_added_date` datetime NOT NULL,
  `s_updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ef_users`
--

CREATE TABLE `ef_users` (
  `u_id` int(10) NOT NULL,
  `u_type` enum('PARENT','TEACHER','STUDENT','ADMIN') NOT NULL,
  `u_name` varchar(50) NOT NULL,
  `u_phone` varchar(100) NOT NULL,
  `u_email` varchar(100) NOT NULL,
  `u_password` varchar(100) NOT NULL,
  `u_token` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ef_users`
--

INSERT INTO `ef_users` (`u_id`, `u_type`, `u_name`, `u_phone`, `u_email`, `u_password`, `u_token`) VALUES
(2, 'PARENT', 'Dijish', '8086960113', 'dijishuk@gmail.com', '192fb1473a6c88aa06f52a230f248cbb', 'f7ad0bf63e48fdb1dd2a25b77ed79458'),
(3, 'PARENT', '', '', '', 'd41d8cd98f00b204e9800998ecf8427e', '4b7edb1ba75e52dfd697e60ee61cc2ce'),
(4, 'PARENT', 'Dhani', '9633666739', 'dhani@gmail.com', '192fb1473a6c88aa06f52a230f248cbb', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ef_students`
--
ALTER TABLE `ef_students`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `ef_users`
--
ALTER TABLE `ef_users`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ef_students`
--
ALTER TABLE `ef_students`
  MODIFY `s_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ef_users`
--
ALTER TABLE `ef_users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
