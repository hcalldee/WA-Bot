create view get_verifikasi_pendaftaran_wa as SELECT a.no_reg as antrian, a.tgl_registrasi, a.no_rkm_medis, c.hari_kerja ,c.jam_mulai , b.nm_poli, d.nm_dokter FROM `reg_periksa` as a 
join poliklinik as b on a.kd_poli = b.kd_poli
join jadwal as c on a.kd_poli = c.kd_poli
join dokter as d on a.kd_dokter = d.kd_dokter
order by a.tgl_registrasi DESC limit 1;

 where a.no_rkm_medis = 000001 and a.tgl_registrasi = date(curdate()) or a.tgl_registrasi = date(curdate()-1)

SELECT a.no_reg as antrian, a.tgl_registrasi, a.no_rkm_medis, c.hari_kerja ,c.jam_mulai , b.nm_poli, d.nm_dokter FROM `reg_periksa` as a 
join poliklinik as b on a.kd_poli = b.kd_poli
join jadwal as c on a.kd_poli = c.kd_poli
join dokter as d on a.kd_dokter = d.kd_dokter
where a.tgl_registrasi >= '2022-12-01';



inner join jadwal as c on (a.kd_dokter = c.kd_dokter and a.kd_poli = c.kd_poli)


create view get_verifikasi_wa as SELECT a.no_reg as antrian, a.tgl_registrasi, a.no_rkm_medis , b.nm_poli , c.hari_kerja as hari_layanan , d.nm_dokter FROM `reg_periksa` as a 
 inner join poliklinik as b on a.kd_poli = b.kd_poli
 inner join dokter as d on a.kd_dokter = d.kd_dokter
 inner join jadwal as c on (a.kd_dokter = c.kd_dokter and a.kd_poli = c.kd_poli and c.hari_kerja = dateToDay(a.tgl_registrasi))
where a.tgl_registrasi >= '2022-12-01';



create view get_verifikasi_wa as SELECT a.no_reg as antrian, a.tgl_registrasi, a.no_rkm_medis, c.hari_kerja ,c.jam_mulai , b.nm_poli, d.nm_dokter FROM `reg_periksa` as a 
join poliklinik as b on a.kd_poli = b.kd_poli
join jadwal as c on a.kd_poli = c.kd_poli
join dokter as d on a.kd_dokter = d.kd_dokter
where a.tgl_registrasi >= '2022-12-01';

-- ready view
create view get_verifikasi_wa as SELECT a.no_reg as antrian, a.tgl_registrasi, a.no_rkm_medis , b.nm_poli , c.hari_kerja as hari_layanan , d.nm_dokter FROM `reg_periksa` as a 
 inner join poliklinik as b on a.kd_poli = b.kd_poli
 inner join dokter as d on a.kd_dokter = d.kd_dokter
 inner join jadwal as c on (a.kd_dokter = c.kd_dokter and a.kd_poli = c.kd_poli and c.hari_kerja = dateToDay(a.tgl_registrasi))
where a.tgl_registrasi >= '2022-12-01';

-- ready fucnt
DELIMITER $$
CREATE FUNCTION `dateToDay`(`tanggal` DATE) RETURNS varchar(255) 
    DETERMINISTIC
BEGIN
  DECLARE varhasil varchar(255);

  SELECT UPPER(
  CONCAT(
    CASE DAYOFWEEK(tanggal)
      WHEN 1 THEN 'Minggu'
      WHEN 2 THEN 'Senin'
      WHEN 3 THEN 'Selasa'
      WHEN 4 THEN 'Rabu'
      WHEN 5 THEN 'Kamis'
      WHEN 6 THEN 'Jumat'
      WHEN 7 THEN 'Sabtu'
    END
  )
  ) INTO varhasil;

  RETURN varhasil;
END$$
DELIMITER ;

create view jadwal_poli as SELECT a.kd_poli, a.kuota, a.hari_kerja, a.jam_mulai, b.kd_dokter, b.nm_dokter,c.nm_poli FROM `jadwal` as a 
join dokter as b on b.kd_dokter = a.kd_dokter
join poliklinik as c on c.kd_poli = a.kd_poli  where b.status = '1'
ORDER BY `a`.`hari_kerja` ASC;
