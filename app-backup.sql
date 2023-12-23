-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 23, 2023 at 10:26 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app`
--

-- --------------------------------------------------------

--
-- Table structure for table `accidentcases`
--

CREATE TABLE `accidentcases` (
  `case_id` int(11) NOT NULL,
  `victim_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `police_id` int(11) DEFAULT NULL,
  `witness_id` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date_occurred` datetime DEFAULT current_timestamp(),
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accidentcases`
--

INSERT INTO `accidentcases` (`case_id`, `victim_id`, `vehicle_id`, `police_id`, `witness_id`, `location`, `date_occurred`, `description`, `status`) VALUES
(4, 2, 14, 2, 2, 'no', '2023-12-23 11:10:26', 'jghjklhk', 'tguig'),
(5, 2, 15, 3, 2, 'Cumilla', '2023-12-23 11:17:28', 'fasdf', 'adfasd'),
(7, 2, 14, 2, 2, 'no', '2023-12-22 11:27:00', 'jghjklhk', 'tguig'),
(8, 2, 14, 2, 3, 'Dhaka', '2023-12-04 15:15:20', 'accident', 'success'),
(9, 2, 16, 2, 2, 'Cumilla', '2023-12-23 15:15:49', 'injure', 'ok');

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `driver_id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nid_number` varchar(20) DEFAULT NULL,
  `license_number` varchar(20) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `age` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drivers`
--

INSERT INTO `drivers` (`driver_id`, `vehicle_id`, `name`, `nid_number`, `license_number`, `contact_number`, `age`) VALUES
(2, 15, 'afdsfa', 'asdfasd', 'fasdfa', 'sdfa', 8),
(3, 15, 'afdsfa', 'asdfasd', 'fasdfa', 'sdfa', 8);

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `case_id` int(11) DEFAULT NULL,
  `created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `trafficpolice`
--

CREATE TABLE `trafficpolice` (
  `police_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `badge_number` varchar(20) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trafficpolice`
--

INSERT INTO `trafficpolice` (`police_id`, `name`, `badge_number`, `contact_number`) VALUES
(1, 'adsf', 'asdfa', 'sdfasd'),
(2, 'asdfa', 'asdfa', 'sdfasd'),
(3, 'afsd', 'fasdf', 'asdfasd'),
(4, 'adsf', 'asdfa', 'sdfasd');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT 0,
  `created` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `username`, `password_hash`, `role`, `created`) VALUES
(1, 'abdurrahim', 'sadf', '4ac174730d4143a119037d9fda81c7a9', 0, '2023-12-21 01:14:07'),
(2, 'abdurrahim', 'sadf', '4ac174730d4143a119037d9fda81c7a9', 0, '2023-12-21 01:15:05'),
(3, 'abdurrahim', 'sadf', '4ac174730d4143a119037d9fda81c7a9', 0, '2023-12-21 01:15:08'),
(4, 'Md. Abdur Rahim Sarkar', 'rahim', '9733b92d7d60ecac9ad32ff7a5c87a3c', 0, '2023-12-21 01:15:49'),
(5, 'Md. Roton Chudhury', 'ratan', '59d2429666c6e5fbf7727b53a228c9b0', 0, '2023-12-22 22:26:01'),
(6, 'Md. Roton Chudhury', 'ratan', '59d2429666c6e5fbf7727b53a228c9b0', 0, '2023-12-22 22:27:16'),
(7, 'ratan', 'rttn', '6e6988be39e53bb92e9ea347ee31a6ee', 0, '2023-12-22 22:29:09'),
(8, 'ratan', 'rttn', '6e6988be39e53bb92e9ea347ee31a6ee', 0, '2023-12-22 22:29:26'),
(9, 'ratan', 'rttn', '6e6988be39e53bb92e9ea347ee31a6ee', 0, '2023-12-22 22:29:27'),
(10, 'adsfa', 'sdfasdf', 'aa41efe0a1b3eeb9bf303e4561ff8392', 0, '2023-12-22 22:30:03'),
(11, 'adsfa', 'sdfasdf', 'aa41efe0a1b3eeb9bf303e4561ff8392', 0, '2023-12-22 22:30:11'),
(12, 'asdfasd', 'fasdfadsf', '6a204bd89f3c8348afd5c77c717a097a', 0, '2023-12-22 22:31:17'),
(13, 'asdfasd', 'fasdfadsf', '6a204bd89f3c8348afd5c77c717a097a', 0, '2023-12-22 22:31:24'),
(14, 'asdfasdf', 'asdfasdf', 'f61b26d635309536c3c83c0adc3cb972', 0, '2023-12-22 22:33:14'),
(15, 'asdfasdf', 'asdfasdf', 'f61b26d635309536c3c83c0adc3cb972', 0, '2023-12-22 22:33:18'),
(16, 'asdfasd', 'fasdfasd', 'a6be11c879133def33fdb767be80056f', 0, '2023-12-22 22:34:00');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `hashPassword` BEFORE INSERT ON `users` FOR EACH ROW BEGIN
SET New.password_hash = MD5(new.password_hash);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `vehicle_type` varchar(50) DEFAULT NULL,
  `mechanical_problem` text DEFAULT NULL,
  `license_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `vehicle_type`, `mechanical_problem`, `license_number`) VALUES
(13, 'sdf7', 'fsd7', 'fds7'),
(14, 'ratan', 'ratan', 'ratan'),
(15, 'roton', 'rotn', 'laksjdflja'),
(16, 'asdffasd', 'fasdfasd', 'fasdf'),
(17, 'sdfasdfasd', 'fasdfasdf', 'asdfasdf');

-- --------------------------------------------------------

--
-- Table structure for table `victims`
--

CREATE TABLE `victims` (
  `victim_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `injury_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `victims`
--

INSERT INTO `victims` (`victim_id`, `name`, `age`, `gender`, `injury_type`) VALUES
(2, 'asdfasdf', 3, 'asdfa', 'sdfasd'),
(3, 'sfdgsd', 9, 'asdfa', 'dsfa');

-- --------------------------------------------------------

--
-- Table structure for table `witnesses`
--

CREATE TABLE `witnesses` (
  `witness_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `statement` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `witnesses`
--

INSERT INTO `witnesses` (`witness_id`, `name`, `contact_number`, `statement`) VALUES
(2, 'asdfas', 'dfas', 'dfasdf'),
(3, 'asdfas', 'dfas', 'dfasdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accidentcases`
--
ALTER TABLE `accidentcases`
  ADD PRIMARY KEY (`case_id`),
  ADD KEY `victim_id` (`victim_id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `police_id` (`police_id`),
  ADD KEY `witness_id` (`witness_id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`driver_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `trafficpolice`
--
ALTER TABLE `trafficpolice`
  ADD PRIMARY KEY (`police_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- Indexes for table `victims`
--
ALTER TABLE `victims`
  ADD PRIMARY KEY (`victim_id`);

--
-- Indexes for table `witnesses`
--
ALTER TABLE `witnesses`
  ADD PRIMARY KEY (`witness_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accidentcases`
--
ALTER TABLE `accidentcases`
  MODIFY `case_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accidentcases`
--
ALTER TABLE `accidentcases`
  ADD CONSTRAINT `accidentcases_ibfk_1` FOREIGN KEY (`victim_id`) REFERENCES `victims` (`victim_id`),
  ADD CONSTRAINT `accidentcases_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`),
  ADD CONSTRAINT `accidentcases_ibfk_3` FOREIGN KEY (`police_id`) REFERENCES `trafficpolice` (`police_id`),
  ADD CONSTRAINT `accidentcases_ibfk_4` FOREIGN KEY (`witness_id`) REFERENCES `witnesses` (`witness_id`);

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
