-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 09, 2023 at 01:53 AM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pendaftaran_pasien`
--

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
  `DT` varchar(128) NOT NULL,
  `insert_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `DT` varchar(128) NOT NULL,
  `insert_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_verified` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `preset_pesan`
--

CREATE TABLE `preset_pesan` (
  `id` int(128) NOT NULL,
  `tipe` varchar(128) NOT NULL,
  `preset_pesan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `daftar_pasien`
--
ALTER TABLE `daftar_pasien`
  ADD PRIMARY KEY (`id_daftar`);

--
-- Indexes for table `preset_pesan`
--
ALTER TABLE `preset_pesan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `preset_pesan`
--
ALTER TABLE `preset_pesan`
  MODIFY `id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
