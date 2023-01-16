-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2023 at 03:21 AM
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
-- Database: `sikok`
--

-- --------------------------------------------------------

--
-- Structure for view `get_verifikasi_wa`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `get_verifikasi_wa`  AS SELECT `a`.`no_reg` AS `antrian`, `a`.`tgl_registrasi` AS `tgl_registrasi`, `a`.`no_rkm_medis` AS `no_rkm_medis`, `b`.`nm_poli` AS `nm_poli`, `c`.`hari_kerja` AS `hari_layanan`, `c`.`jam_mulai` AS `jam_layanan`, `d`.`nm_dokter` AS `nm_dokter` FROM (((`reg_periksa` `a` join `poliklinik` `b` on(`a`.`kd_poli` = `b`.`kd_poli`)) join `dokter` `d` on(`a`.`kd_dokter` = `d`.`kd_dokter`)) join `jadwal` `c` on(`a`.`kd_dokter` = `c`.`kd_dokter` and `a`.`kd_poli` = `c`.`kd_poli` and `c`.`hari_kerja` = `dateToDay`(`a`.`tgl_registrasi`))) WHERE `a`.`tgl_registrasi` >= '2022-12-01''2022-12-01'  ;

--
-- VIEW `get_verifikasi_wa`
-- Data: None
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
