-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2023 at 04:18 AM
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
('628778801421263020628099900052023110', '', 'Muhammad Haekal', '6302062809990005', 'Jl Jeruk', 'BPJS', 'Poli Mata', '6287788014212', 'Hafiz', 'Paulinawaty', '08125116589', 'Muhammad_Haekal_6287788014212_KartuAsuransi.jpeg', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', 'Muhammad_Haekal_6287788014212_SK.jpeg', 'Muhammad_Haekal_6287788014212_SR.jpeg', '2023-01-09 01:50:05', 1),
('628135196244963721234567890002023113', '', 'Fernandy Dito', '6372123456789000', 'Banjarbaru', 'BPJS', 'Poli Penyakit Dalam_dr. Gabril', '6281351962449', 'Ali Iwansyah', 'Nora', '085312345678', '', '6372123456789000_6281351962449_KTP.jpeg', '', '', '', '', '2023-01-12 05:45:52', 1),
('628778801421263020628099900052023111', '', 'Muhammad Haekal', '6302062809990005', 'Jl Jeruk', 'BPJS', 'Poli Mata_dr. Diana', '6287788014212', 'Hafiz', 'Paulinawaty', '08125116589', '', '6302062809990005_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-12 05:52:07', 1),
('62877880142126302062809990005202316', '', 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-12 05:53:00', 1),
('628135196244963721234567890002023113', '', 'Fernandy Dito', '6372123456789000', 'Banjarbaru', 'BPJS', 'Poli Penyakit Dalam_dr. Gabril', '6281351962449', 'Ali Iwansyah', 'Nora', '085312345678', '', '6372123456789000_6281351962449_KTP.jpeg', '', '', '', '', '2023-01-12 05:57:23', 1),
('628778801421263020628099900052023114', '', 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'UMUM', 'Poli Mata_dr. Diana', '6287788014212', 'Asmuni', 'Maslinah', '08125116589', '', '6302062809990005_6287788014212_KTP.jpeg', 'Muhammad_Haekal_6287788014212_KartuRSPI.jpeg', '', '', '', '2023-01-13 01:44:45', 1),
('6285652566136372061010860022023114', '', 'Fakhrizal Akbar', '637206101086002', 'Kemuning', 'bpjs', 'Jantung_dr Faisal', '628565256613', 'Akbar', 'Amy', '081520968764', '', '637206101086002_628565256613_KTP.jpeg', '', '', '', '', '2023-01-13 06:16:56', 1),
('628129906191563030508099500062023114', '', 'Ahmad Noor Fuadi', '6303050809950006', 'Martapura', 'umum', 'Mata_dr. Diana', '6281299061915', 'Aulia ', 'St.suarti', '081299061915', '', '6303050809950006_6281299061915_KTP.jpeg', '', '', '', '', '2023-01-13 06:31:42', 1),
('628225165550763455929129555002023114', '', 'Ahmad Riyadi', '6345592912955500', 'Martapura', 'Umum', 'THT_Sri Shofia', '6282251655507', 'Yadi', 'Marliana', '082251655507', '', '6345592912955500_6282251655507_KTP.jpeg', '', '', '', '', '2023-01-13 06:44:28', 1),
('62822516555076345592912900012023114', '', 'Ahmad Riyadi', '634559291290001', 'Martapura', 'Umum', 'Orthopedi_Adijayansyah', '6282251655507', 'Yadi', 'Marliana', '082251655507', '', '', '', '', '', '', '2023-01-13 07:02:51', 1),
('62822516555076345592912900052023114', '', 'Ahmad Riyadi', '634559291290005', 'Martapura', 'Umum', 'mata_Diana', '6282251655507', 'Yadi', 'Marliana', '082251655507', '', '', '', '', '', '', '2023-01-13 07:14:55', 1),
('628778801421263020628099900052023122', '', 'Haekal', '6302062809990005', 'Jl Jeurk', 'Umum', 'Mata_dr. Diana', '6287788014212', 'Kadir', 'Aslimin', '08125116589', '', '6302062809990005_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-21 02:13:14', 1),
('628778801421263020628099900052023122', '', 'Haekal', '6302062809990005', 'Jl Jeurk', 'Umum', 'Mata_dr. Diana', '6287788014212', 'Kadir', 'Aslimin', '08125116589', '', '', '', '', '', '', '2023-01-21 02:48:52', 1);

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
('628125353489122023122', NULL, 'ali', '2', '3', 'Umum', 'penyakit dalam_gabril', '6281253534891', 'ibu', 'ibu', '081263528294711', '', '', '', '', '', '', '2023-01-21 03:09:20', 0),
('628125353489163721234567890012023112', NULL, 'Ali Iwansyah', '6372123456789001', 'jl. Scumvul no.99', 'BPJS', 'Poli Penyakit Dalam_dr. Gabril', '6281253534891', 'fernandy dito', 'luna maya', '085312345678', '6372123456789001_6281253534891_KartuAsuransi.jpeg', '6372123456789001_6281253534891_KTP.jpeg', '', '', 'Ali_Iwansyah_6281253534891_SK.jpeg', 'Ali_Iwansyah_6281253534891_SR.jpeg', '2023-01-11 07:08:42', 2),
('628135196244963721234567890002023112', NULL, 'Fernandy Dito', '6372123456789000', 'Banjarbaru', 'BPJS', 'Poli Penyakit Dalam_dr. Gabril', '6281351962449', 'Ali Iwansyah', 'Nora', '085312345678', '6372123456789000_6281351962449_KartuAsuransi.jpeg', '6372123456789000_6281351962449_KTP.jpeg', '', '', 'Fernandy_Dito_6281351962449_SK.jpeg', 'Fernandy_Dito_6281351962449_SR.jpeg', '2023-01-11 05:55:33', 2),
('628225165550763455929129555002023114', NULL, 'Ahmad Riyadi', '6345592912955500', 'Martapura', 'Umum', 'THT_Sri Shofia', '6282251655507', 'Yadi', 'Marliana', '082251655507', '', '6345592912955500_6282251655507_KTP.jpeg', 'Ahmad_Riyadi_6282251655507_KartuRSPI.jpeg', '', '', '', '2023-01-13 06:51:37', 2),
('628778801421217110162100162023125', NULL, 'MuhammadHaekal', '1711016210016', 'JlKenanga', 'Umum', 'PoliMata_drdiana', '6287788014212', 'jumriah', 'saidah', '0812345678900', '', '', '', '', '', '', '2023-01-24 05:23:58', 2),
('628778801421263020628099900052023114', NULL, 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'UMUM', 'Poli THT_dr. Sofi', '6287788014212', 'Asmuni', 'Maslinah', '08125116589', '', '6302062809990005_6287788014212_KTP.jpeg', 'Muhammad_Haekal_6287788014212_KartuRSPI.jpeg', '', '', '', '2023-01-13 01:56:12', 2),
('628778801421263020628099900052023115', NULL, 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Mata_dr.Diana', '6287788014212', 'Syarifuddin', 'Asniah', '0879787675', '', '', '', '', '', '', '2023-01-14 02:00:18', 0),
('628778801421263020628099900052023118', NULL, 'Muhammad Haekal', '6302062809990005', 'Jl.Jeruk', 'Umum', 'Poli Anak _Yanuar', '6287788014212', 'Hafizh', 'Paulina', '08125116589', '', '', '', '', '', '', '2023-01-17 07:46:47', 0),
('62877880142126302062809990005202317', NULL, 'Muhammad Haekal', '6302062809990005', 'Jl. Jeruk', 'Umum', 'Poli Jantung', '6287788014212', 'Jauhari ', 'maslina', '087796352440', '', 'Muhammad_Haekal_6287788014212_KTP.jpeg', '', '', '', '', '2023-01-06 06:41:52', 0);

-- --------------------------------------------------------

--
-- Table structure for table `preset_pesan`
--

CREATE TABLE `preset_pesan` (
  `id` int(128) NOT NULL,
  `tipe` varchar(128) NOT NULL,
  `preset_pesan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `preset_pesan`
--

INSERT INTO `preset_pesan` (`id`, `tipe`, `preset_pesan`) VALUES
(1, 'header', 'Assalamualaikum Wr. Wb, Selamat datang di Pelita Insani Care (PI-Care)\\n Jika Anda Pengguna Baru Layanan PI-Care, dianjurkan untuk \\n terlebih dahulu mengakses menu 1 untuk informasi \\n mengenai cara pendaftaran melalui layanan WA PI-Care \\n Terimakasih Atas partisipasi Anda'),
(2, 'menu', 'Assalamualaikum Wr. Wb, Selamat datang di Help Desk Rumah Sakit Pelita Insani\\n Silahkan pilih menu dengan mengirimkan angka pada menu yang tersedia\\n 1. Informasi Pengisian Form Pendaftaran Rawat Jalan\\n 2. Daftar Rawat Jalan\\n 3. List Kata Kunci WA Robot\\n 0. Kembali'),
(3, 'pengumuman', '*PENGUMUMAN* \\n\\n 1. Perubahan Jadwal Poli dr. Winny hari kamis & jumat menjadi ( 14.00 - selesai )\\n\r\n\"2. Perubahan Jadwal Poli dr. Made hari senin - sabtu menjadi ( 15.00 - 17.00 )\\n\r\n3. Poli paru dr. Hendra Masih belum dibuka hingga waktu yang belum ditentukan\\n 4. Perubahan Jadwal Poli paru dr. Norma hari selasa & kamis menjadi ( 16.00 - 18.00 )\\n 5. Perubahan Jadwal Poli THT dr. Sofhia hari senin - sabtu menjadi ( 16.30 - 18.00 )\\n 6. Layanan Poli gigi dan mulut dr. inggar sudah tidak beroperasi\\n Atas Perhatian Anda, Kami Ucapkan Terimakasih.'),
(4, 'kata kunci', 'List Kata Kunci Upload :\\n\r\n1. \\\"Upload KTP\\\" untuk upload dokumen KTP \\n\r\n2. \\\"Upload Kartu Jaminan Kesehatan\\\" untuk upload dokumen Kartu Jaminan Kesehatan \\n\r\n3. \\\"Upload Kartu Berobat\\\" untuk upload dokumen Kartu Identitas Berobat Rumah Sakit Pelita Insani\\n\r\n4. \\\"Upload GL\\\" untuk upload dokumen Guaranteee Letter\\n\r\n5. \\\"Upload Surat Kontrol\\\" untuk upload dokumen Surat Kontrol\\n\r\n6. \\\"Upload Surat Rujukan\\\" untuk upload dokumen Surat Rujukan\\n\r\n7. \\\"Halo\\\" untuk aktivasi layanana Robot WA\\n\r\n8. \\\"Batal\\\" untuk pembatalan registrasi sebelum proses registrasi diselesaikan\\n\r\n9. \\\"Selesai Isi\\\" untuk Menyelesaikan Proses Regsitrasi Rawat Jalan\\n'),
(5, 'berhasil upload', 'Data Berhasil Disimpan sementara. silahkan lanjutkan proses upload lampiran sesuai dengan jenis bayar yang anda gunakan \\n \\n\r\nUMUM\\n KTP, Kartu Berobat *jika Memiliki\\n\r\nBPJS\\n KTP, Kartu BPJS , Kartu Berobat *jika Memiliki, Surat Rujukan, Surat Kontrol *jika Kontrol\\n\r\nPihak Ketiga\\n KTP, Guarantee Letter, Kartu Berobat *jika Memiliki\\n\r\nAsuransi\\n KTP, Kartu Asuransi, Kartu Berobat *jika Memiliki, Surat Rujukan, Surat Kontrol *jika Kontrol'),
(6, 'flag informasi', '*LAYANAN PI-CARE HANYA UNTUK LAYANAN SATU HARI SETELAH PENDAFTARAN*\\n\n*UNTUK PENDAFTARAN DIHARI YANG SAMA SILAHKAN DAFTAR LANGSUNG DI RUMAH SAKIT*\\n\\n\nJadwal Layanan PI-Care \\n\nMinggu - Jumat, 08:00-15:00\\n\nSabtu dan H-1 Hari Libur (tanggal merah) Tutup\\n\\n\nPendaftaran di Hari Minggu atau Hari Libur akan dikonfirmasi Admin pada hari kerja\\n\nPendaftaran di Hari kerja akan di konfirmasi pada jam 03:00 siang setelah pendaftaran PI-Care ditutup silahkan ditunggu. Terimakasih'),
(7, 'form data diri', 'Form Pendaftaran Pasien\\n \nNama : \\n\nNIK  : \\n\nAlamat  : \\n\nJenis Bayar : (BPJS, Umum, Asuransi atau Pihak Ketiga) Pilih Salah Satu tanpa Tanda Kurung\\n\nPoli Tujuan : \\n\nDokter Tujuan : \\n\nNama Penanggung Jawab : \\n\nNama Ibu Kandung : \\n\nNo Telp Penanggung Jawab : '),
(8, 'info tambahan 1', 'Silahkan Lengkapi dokumen lainnya seperti \\n\n1. Foto KTP \\n\n2. Foto Kartu Jaminan Kesehatan (BPJS atau Asuransi Kesehatan Lainnya Jika Memiliki)\\n\n3. Foto Kartu Peserta Berobat RS Pelita Insani (Jika Memiliki)\\n\n4. Jika Menggunakan BPJS Lampirkan Surat Rujukan, Surat Kontrol (jika ingin kontrol)\\n\n5. Jika Menggunakan Pihak Ketiga Lampirkan Guarrantee Letter (GL)'),
(9, 'info tambahan 2', 'Kirim kode konfirmasi \\\"Contoh Isian Form\\\" Tanpa Tanda Petik \\n Jika ingin melihat Contoh Pengisian Form pendaftaran pasien\\n'),
(10, 'info tambahan 3', 'Foto Dokumen dengan jelas dan terbaca. jika sudah selesai mengirim semua data, Kirim kode konfirmasi \\\"Selesai Isi\\\" Tanpa Tanda Petik'),
(11, 'contoh form', 'Form Pendaftaran Pasien\\n\r\nNama : Muhammad Fulan \\n\r\nNIK  : 0123456789101112 \\n\r\nAlamat  : Jl.Bumi \\n\r\nJenis Bayar : Umum \\n\r\nPoli Tujuan : Penyakit Dalam \\n\r\nDokter Tujuan : dr Fulan \\n\r\nNama Penanggung Jawab : Ahmad Fulan \\n\r\nNama Ibu Kandung : Siti Fulan \\n\r\nNo Telp Penanggung Jawab : 0812345678'),
(12, 'pesan pembatalan 1', 'mohon maaf tidak ada poli yang anda tuju di tanggal tersebut'),
(13, 'pesan pembatalan 2', 'mohon maaf dokumen anda tidak lengkap silahkan dilengkapi'),
(14, 'pesan pembatalan 3', 'mohon maaf dokumen yang anda kirim tidak sesuai, dimohon untuk melampirkan dokumen yang sesuai dengan data diri anda, terimakasih.'),
(15, 'pesan pembatalan 4', 'mohon maaf dokter spesialis menlakukan reshcedule dan poli ditutup. silahkan daftar ulang di jadwal selanjutnya terimakasih.'),
(16, 'pesan pembatalan 5', 'Permintaan Pembatalan dari Pasien Karena Alasan Tertentu / Mendadak');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(128) NOT NULL,
  `role_nm` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role_id` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `preset_pesan`
--
ALTER TABLE `preset_pesan`
  MODIFY `id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
