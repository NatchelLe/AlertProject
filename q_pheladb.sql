-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2023 at 09:49 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `q_pheladb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alerts`
--

CREATE TABLE `alerts` (
  `Alert_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date DEFAULT NULL,
  `citizen_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `user_input` varchar(255) NOT NULL,
  `bot_response` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `user_input`, `bot_response`, `timestamp`) VALUES
(1, 'hi', 'HI hello   Welcome to Qphela  Chat bot. How can I help you?', '2023-11-13 13:16:38'),
(2, 'tttwgdg', 'I\'m sorry, I didn\'t understand. Please select a keyword: busy, GBV, overcrowded, quiet, public transport, night, stranger, emergency, self-defense, online, traffic rules, ATM, parking, cybersecurity, traveling alone, social gatherings, children safety, wo', '2023-11-13 13:17:39'),
(3, 'hi', 'HI hello   Welcome to Qphela  Chat bot. How can I help you?', '2023-11-13 13:24:30'),
(4, 'how to survice  busy town', 'When in a busy area, stay alert and be aware of your surroundings. Avoid displaying valuable items.', '2023-11-13 13:24:53'),
(5, 'hi', 'HI hello   Welcome to Qphela  Chat bot. How can I help you?', '2023-11-13 13:27:43'),
(6, 'how to to survive busy town', 'When in a busy area, stay alert and be aware of your surroundings. Avoid displaying valuable items.', '2023-11-13 13:28:13'),
(7, 'hi how to avoiding theft', 'HI hello   Welcome to Qphela  Chat bot. How can I help you?', '2023-11-13 13:29:47'),
(8, 'how to avoiding theft', 'To avoid theft, keep your belongings secure, be aware of your surroundings, and use anti-theft measures such as locking your bags.', '2023-11-13 13:30:05'),
(9, 'how to avoid carjacking', 'To reduce the risk of carjacking, be aware of your surroundings, keep your car doors locked, and avoid stopping in isolated or poorly lit areas.', '2023-11-13 13:31:36'),
(10, 'hi', 'HI hello   Welcome to Qphela  Chat bot. How can I help you?', '2023-11-13 13:35:18'),
(11, 'hi', 'HI hello   Welcome to Qphela  Chat bot. How can I help you?', '2023-11-13 13:35:29');

-- --------------------------------------------------------

--
-- Table structure for table `citizen`
--

CREATE TABLE `citizen` (
  `citizen_id` int(11) NOT NULL,
  `citizen_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizen`
--

INSERT INTO `citizen` (`citizen_id`, `citizen_name`, `email`, `password`, `contact_number`) VALUES
(1, 'citizen1', 'citizen1@example.com', 'password1', '123-456-7890'),
(2, 'citizen2', 'citizen2@example.com', 'password2', '987-654-3210');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,6) NOT NULL,
  `longitude` decimal(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recommendation`
--

CREATE TABLE `recommendation` (
  `recommendation_id` int(11) NOT NULL,
  `rec_description` text DEFAULT NULL,
  `start_location` varchar(255) DEFAULT NULL,
  `end_location` varchar(255) DEFAULT NULL,
  `citizen_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `report_id` int(11) NOT NULL,
  `incident_type` varchar(255) NOT NULL,
  `rep_description` text DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `location_id` int(11) DEFAULT NULL,
  `citizen_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `safety_tips`
--

CREATE TABLE `safety_tips` (
  `tip_id` int(11) NOT NULL,
  `tip_description` text DEFAULT NULL,
  `citizen_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trip`
--

CREATE TABLE `trip` (
  `trip_description` text DEFAULT NULL,
  `trip_id` int(11) NOT NULL,
  `location_id` int(11) DEFAULT NULL,
  `citizen_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `alerts`
--
ALTER TABLE `alerts`
  ADD PRIMARY KEY (`Alert_id`),
  ADD KEY `citizen_id` (`citizen_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `citizen`
--
ALTER TABLE `citizen`
  ADD PRIMARY KEY (`citizen_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `recommendation`
--
ALTER TABLE `recommendation`
  ADD PRIMARY KEY (`recommendation_id`),
  ADD KEY `citizen_id` (`citizen_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `citizen_id` (`citizen_id`);

--
-- Indexes for table `safety_tips`
--
ALTER TABLE `safety_tips`
  ADD PRIMARY KEY (`tip_id`),
  ADD KEY `citizen_id` (`citizen_id`);

--
-- Indexes for table `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`trip_id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `citizen_id` (`citizen_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alerts`
--
ALTER TABLE `alerts`
  MODIFY `Alert_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `citizen`
--
ALTER TABLE `citizen`
  MODIFY `citizen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `recommendation`
--
ALTER TABLE `recommendation`
  MODIFY `recommendation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `safety_tips`
--
ALTER TABLE `safety_tips`
  MODIFY `tip_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trip`
--
ALTER TABLE `trip`
  MODIFY `trip_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alerts`
--
ALTER TABLE `alerts`
  ADD CONSTRAINT `alerts_ibfk_1` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`citizen_id`),
  ADD CONSTRAINT `alerts_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `recommendation`
--
ALTER TABLE `recommendation`
  ADD CONSTRAINT `recommendation_ibfk_1` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`citizen_id`),
  ADD CONSTRAINT `recommendation_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  ADD CONSTRAINT `report_ibfk_2` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`citizen_id`);

--
-- Constraints for table `safety_tips`
--
ALTER TABLE `safety_tips`
  ADD CONSTRAINT `safety_tips_ibfk_1` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`citizen_id`);

--
-- Constraints for table `trip`
--
ALTER TABLE `trip`
  ADD CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`),
  ADD CONSTRAINT `trip_ibfk_2` FOREIGN KEY (`citizen_id`) REFERENCES `citizen` (`citizen_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
