-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2020 at 05:12 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie`
--

-- --------------------------------------------------------

--
-- Table structure for table `budget_lang`
--

CREATE TABLE `budget_lang` (
  `budget_lang_ID` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `original_Lang` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `budget_lang`
--

INSERT INTO `budget_lang` (`budget_lang_ID`, `amount`, `original_Lang`) VALUES
(1, 237000000, 'en'),
(2, 300000000, 'en'),
(3, 250000000, 'en'),
(4, 258000000, 'en'),
(5, 280000000, 'en'),
(6, 250000000, 'en'),
(7, 250000000, 'en'),
(8, 270000000, 'en'),
(9, 200000000, 'en'),
(10, 225000000, 'en'),
(11, 225000000, 'en'),
(12, 250000000, 'en'),
(13, 215000000, 'en'),
(14, 5000000, 'NL'),
(15, 6000, 'nl');

-- --------------------------------------------------------

--
-- Table structure for table `cast`
--

CREATE TABLE `cast` (
  `cast_ID` int(11) NOT NULL,
  `character_name` varchar(255) DEFAULT NULL,
  `actore_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cast`
--

INSERT INTO `cast` (`cast_ID`, `character_name`, `actore_name`) VALUES
(1, 'Jake Sully', 'Sam Worthington'),
(2, 'Captain Jack Sparrow', 'Johnny Depp'),
(3, 'Bruce Wayne / Batman', 'Christian Bale'),
(4, 'Peter Parker / Spider-Man', 'Tobey Maguire'),
(5, 'Tony Stark / Iron Man', 'Robert Downey Jr'),
(6, 'Harry Potter', 'Daniel Radcliffe'),
(7, 'Bruce Wayne / Batman', 'Ben Affleck'),
(8, 'Superman / Clark Kent', 'Brandon Routh'),
(9, 'Captain Jack Sparrow', 'Johnny Depp'),
(10, 'Clark Kent / Kal-El', 'Henry Cavill'),
(11, 'Agent J', 'Will Smith'),
(12, 'Bilbo Baggins', 'Martin Freeman'),
(13, 'Peter Parker / Spider-Man', 'Andrew Garfield');

-- --------------------------------------------------------

--
-- Table structure for table `movie_cast`
--

CREATE TABLE `movie_cast` (
  `movie_cast_ID` int(11) NOT NULL,
  `movie_genres_ID` int(11) NOT NULL,
  `cast_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie_cast`
--

INSERT INTO `movie_cast` (`movie_cast_ID`, `movie_genres_ID`, `cast_ID`) VALUES
(1, 4, 1),
(3, 7, 2),
(4, 9, 3),
(5, 10, 4),
(6, 11, 5),
(7, 12, 6),
(8, 13, 7),
(9, 14, 8),
(10, 15, 9),
(11, 16, 10),
(12, 17, 11),
(13, 18, 12),
(14, 19, 13);

-- --------------------------------------------------------

--
-- Table structure for table `movie_genres`
--

CREATE TABLE `movie_genres` (
  `movie_genres_ID` int(11) NOT NULL,
  `movie_title` varchar(255) DEFAULT NULL,
  `genres` varchar(255) DEFAULT NULL,
  `vote_ID` int(11) NOT NULL,
  `budget_lang_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie_genres`
--

INSERT INTO `movie_genres` (`movie_genres_ID`, `movie_title`, `genres`, `vote_ID`, `budget_lang_ID`) VALUES
(4, 'Avatar', 'Action', 1, 1),
(7, 'Pirates of the Caribbean: At World\'s End', 'Adventure', 2, 2),
(9, 'The Dark Knight Rises', 'Action', 3, 3),
(10, 'Spider-Man 3', 'Action', 4, 4),
(11, 'Avengers: Age of Ultron', 'Adventure', 5, 5),
(12, 'Harry Potter and the Half-Blood Prince', 'Fantasy', 6, 6),
(13, 'Batman v Superman: Dawn of Justice', 'Fantasy', 7, 7),
(14, 'Superman Returns', 'Action', 8, 8),
(15, 'Pirates of the Caribbean: Dead Man\'s Chest', 'Adventure', 9, 9),
(16, 'Man of Steel', 'Action', 10, 10),
(17, 'Men in Black 3', 'Comedy', 11, 11),
(18, 'The Hobbit: The Battle of the Five Armies', 'Action', 12, 12),
(19, 'The Amazing Spider-Man', 'Action', 13, 13);

-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `vote_ID` int(11) NOT NULL,
  `vote_avarage` int(11) DEFAULT NULL,
  `vote_counte` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vote`
--

INSERT INTO `vote` (`vote_ID`, `vote_avarage`, `vote_counte`) VALUES
(1, 7, 11800),
(2, 7, 4500),
(3, 8, 9106),
(4, 6, 3576),
(5, 7, 6767),
(6, 7, 5293),
(7, 6, 7004),
(8, 5, 1400),
(9, 7, 5246),
(10, 7, 6359),
(11, 6, 4160),
(12, 7, 4760),
(13, 7, 6586);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budget_lang`
--
ALTER TABLE `budget_lang`
  ADD PRIMARY KEY (`budget_lang_ID`);

--
-- Indexes for table `cast`
--
ALTER TABLE `cast`
  ADD PRIMARY KEY (`cast_ID`);

--
-- Indexes for table `movie_cast`
--
ALTER TABLE `movie_cast`
  ADD PRIMARY KEY (`movie_cast_ID`),
  ADD KEY `fk_movie_genresID` (`movie_genres_ID`),
  ADD KEY `fk_castID` (`cast_ID`);

--
-- Indexes for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD PRIMARY KEY (`movie_genres_ID`),
  ADD KEY `fk_voteID` (`vote_ID`),
  ADD KEY `fk_budget_langID` (`budget_lang_ID`);

--
-- Indexes for table `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`vote_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `budget_lang`
--
ALTER TABLE `budget_lang`
  MODIFY `budget_lang_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `cast`
--
ALTER TABLE `cast`
  MODIFY `cast_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `movie_cast`
--
ALTER TABLE `movie_cast`
  MODIFY `movie_cast_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `movie_genres`
--
ALTER TABLE `movie_genres`
  MODIFY `movie_genres_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `vote`
--
ALTER TABLE `vote`
  MODIFY `vote_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `movie_cast`
--
ALTER TABLE `movie_cast`
  ADD CONSTRAINT `fk_castID` FOREIGN KEY (`cast_ID`) REFERENCES `cast` (`cast_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_movie_genresID` FOREIGN KEY (`movie_genres_ID`) REFERENCES `movie_genres` (`movie_genres_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `movie_genres`
--
ALTER TABLE `movie_genres`
  ADD CONSTRAINT `fk_budget_langID` FOREIGN KEY (`budget_lang_ID`) REFERENCES `budget_lang` (`budget_lang_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_voteID` FOREIGN KEY (`vote_ID`) REFERENCES `vote` (`vote_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
