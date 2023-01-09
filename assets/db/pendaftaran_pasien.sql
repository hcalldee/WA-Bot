-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2023 at 08:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pendaftaran_pasien`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `validate` (IN `id` VARCHAR(128))   BEGIN
    update daftar_pasien set is_verified = 1 where id_daftar = id;
    insert into batal_daftar (select * from  daftar_pasien where id_daftar = id);
	delete from daftar_pasien where id_daftar = id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `batal_daftar`
--

CREATE TABLE `batal_daftar` (
  `id_daftar` varchar(128) NOT NULL,
  `no_rm` varchar(128) NOT NULL,
  `Nama` varchar(128) NOT NULL,
  `NIK` varchar(128) NOT NULL,
  `Alamat` varchar(128) NOT NULL,
  `Jenis_Bayar` varchar(128) NOT NULL,
  `Poli_tujuan` varchar(128) NOT NULL,
  `no_wa` varchar(128) NOT NULL,
  `nama_penjamin` varchar(128) NOT NULL,
  `nama_ibu` varchar(128) NOT NULL,
  `no_penjamin` varchar(128) NOT NULL,
  `KartuAsuransi` varchar(128) NOT NULL,
  `KTP` varchar(128) NOT NULL,
  `KartuRSPI` varchar(128) NOT NULL,
  `GL` varchar(128) NOT NULL,
  `SK` varchar(128) NOT NULL,
  `SR` varchar(128) NOT NULL,
  `insert_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batal_daftar`
--

INSERT INTO `batal_daftar` (`id_daftar`, `no_rm`, `Nama`, `NIK`, `Alamat`, `Jenis_Bayar`, `Poli_tujuan`, `no_wa`, `nama_penjamin`, `nama_ibu`, `no_penjamin`, `KartuAsuransi`, `KTP`, `KartuRSPI`, `GL`, `SK`, `SR`, `insert_at`, `is_verified`) VALUES
('62877880142126302062809990005202319', '', 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-08 15:17:50', 1),
('62877880142126302062809990005202319', '', 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-08 15:21:25', 1),
('62877880142126302062809990005202319', '', 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-08 15:22:35', 1),
('628778801421263020628099900052023110', '', 'Muhammad Haekal', '6302062809990005', 'Jl Jeruk', 'BPJS', 'Poli Mata', '6287788014212', 'Hafiz', 'Paulinawaty', '08125116589', 'Muhammad_Haekal_6287788014212_KartuAsuransi.jpeg', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', 'Muhammad_Haekal_6287788014212_SK.jpeg', 'Muhammad_Haekal_6287788014212_SR.jpeg', '2023-01-09 01:50:05', 1);

-- --------------------------------------------------------

--
-- Table structure for table `daftar_pasien`
--

CREATE TABLE `daftar_pasien` (
  `id_daftar` varchar(128) NOT NULL,
  `no_rm` varchar(128) DEFAULT NULL,
  `Nama` varchar(128) NOT NULL,
  `NIK` varchar(128) NOT NULL,
  `Alamat` varchar(128) NOT NULL,
  `Jenis_Bayar` varchar(128) NOT NULL,
  `Poli_tujuan` varchar(128) NOT NULL,
  `no_wa` varchar(128) DEFAULT NULL,
  `nama_penjamin` varchar(128) NOT NULL,
  `nama_ibu` varchar(128) NOT NULL,
  `no_penjamin` varchar(128) NOT NULL,
  `KartuAsuransi` varchar(128) NOT NULL,
  `KTP` varchar(128) NOT NULL,
  `KartuRSPI` varchar(128) NOT NULL,
  `GL` varchar(128) NOT NULL,
  `SK` varchar(128) NOT NULL,
  `SR` varchar(128) NOT NULL,
  `insert_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `daftar_pasien`
--

INSERT INTO `daftar_pasien` (`id_daftar`, `no_rm`, `Nama`, `NIK`, `Alamat`, `Jenis_Bayar`, `Poli_tujuan`, `no_wa`, `nama_penjamin`, `nama_ibu`, `no_penjamin`, `KartuAsuransi`, `KTP`, `KartuRSPI`, `GL`, `SK`, `SR`, `insert_at`, `is_verified`) VALUES
('002', NULL, 'asd', 'asd', 'asd', 'asd', 'asd', '6287788014212', '', '', '', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', '2023-01-02 02:33:01', 0),
('62812505628686302000000000014202314', NULL, 'Tri', '6302000000000014', 'kotabaru', 'BPJS', 'umum', '6281250562868', 'enda', 'mama', '081250000068', '', 'Tri_6281250562868_KTP.jpeg', '', '', '', '', '2023-01-03 13:02:14', 2),
('628778801421263020628099900052023111', NULL, 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-09 01:36:50', 2),
('62877880142126302062809990005202316', NULL, 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-05 01:47:13', 0),
('62877880142126302062809990005202317', NULL, 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-06 06:41:52', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftar_pasien`
--
ALTER TABLE `daftar_pasien`
  ADD PRIMARY KEY (`id_daftar`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
