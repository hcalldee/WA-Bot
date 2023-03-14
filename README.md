# WA-Bot

*jika anda mengalami kesulitan feel free to contact me at

![Twitter URL](https://img.shields.io/twitter/url?label=%40cimolgemay&style=social&url=https%3A%2F%2Ftwitter.com%2Fcimolgemay)

<h3>Requirement</h3>
<table class="table">
  <thead>
    <tr>
      <th colspan="3" scope="col">Dependency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://nodejs.org/en/" target="_blank">Node JS</a></td>
      <td><a href="https://www.npmjs.com/package/body-parser" target="_blank">Body-Parser</a></td>
      <td><a href="https://www.npmjs.com/package/compress-images" target="_blank">compress-images</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/fs-extra" target="_blank">fs-extra</a></td>
      <td><a href="https://www.npmjs.com/package/gifsicle" target="_blank">gifsicle</a></td>
      <td><a href="https://www.npmjs.com/package/pngquant-bin" target="_blank">pngquant-bin</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/mysql" target="_blank">mysql</a></td>
      <td><a href="https://www.npmjs.com/package/whatsapp-web.js" target="_blank">whatsapp-web.js</a></td>
      <td><a href="https://www.npmjs.com/package/qrcode-terminal" target="_blank">qrcode-terminal</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/pm2" target="_blank">PM2</a></td>
      <td><a href="https://www.npmjs.com/package/cors" target="_blank">CORS</a></td>
      <td><a href="https://www.npmjs.com/package/express" target="_blank">Express</a></td>
    </tr>
  </tbody>
</table>

<h3>Cara Instalasi</h3>

  1. Pastikan Node Js, npm, dan aplikasi xampp/lampp/mampp sudah terinstal
  2. buat database pendaftaran_pasien menggunakan import query dari folder assets/db/pendaftaran_pasien.sql
  3. buka file query pada assets/db/sql_view.sql
  4. pada database sik (simrs Khanza / Mlite) jalankan query berikut untuk membuat procedure dan view<br>
  5. jalankan query dibawah comment -- ready view 
  
```sh 
create view get_verifikasi_wa as SELECT a.no_reg as antrian, a.tgl_registrasi, a.no_rkm_medis , b.nm_poli , c.hari_kerja as hari_layanan , d.nm_dokter FROM   
reg_periksa as a 
inner join poliklinik as b on a.kd_poli = b.kd_poli 
inner join dokter as d on a.kd_dokter = d.kd_dokter 
inner join jadwal as c on (a.kd_dokter = c.kd_dokter and a.kd_poli = c.kd_poli and c.hari_kerja = dateToDay(a.tgl_registrasi)) 
where a.tgl_registrasi >= '2022-12-01'
```
   
  6. jalankan query dibawah comment -- ready datetoday 

```sh
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
    END)
  ) INTO varhasil;
  RETURN varhasil;
END$$
DELIMITER ;
```
   
  7. jalankan query dibawah comment -- view jadwal poli 
  
```sh
create view jadwal_poli as SELECT a.kd_poli, a.kuota, a.hari_kerja, a.jam_mulai, b.nm_dokter,c.nm_poli FROM `jadwal` as a 
join dokter as b on b.kd_dokter = a.kd_dokter
join poliklinik as c on c.kd_poli = a.kd_poli  
where b.status = '1' ORDER BY `a`.`hari_kerja` ASC;
```
   
  8. install semua dependency menggunakan command berikut
  
   ```sh
   npm i body-parser compress-images express fs-extra gifsicle@5.3.0 mysql pngquant-bin@6.0.1 qrcode-terminal whatsapp-web.js cors
   ```
   
  9. gunakan perintah 
  
   ```sh
   node app.js
   ```    
   
  kemudian scan qr menggunakan whatsapp yang ada pada android
  
<h3>Configurasi Hardcode</h3>

1. konfigurasi variabel ada pada dokumen
   ```sh
   bot_env/utils/raw_function.js
   ```    
   
2. konfigurasi db pendaftaran_pasien ada pada dokumen
   ```sh
   bot_env/db.js
   ```    

3. konfigurasi db sik ada pada dokumen
   ```sh
   api_env/db.js
   ```    
   
4. configurasi port ada pada dokumen 
   ```sh
   app.js
   ```    
*note 8081 untuk env bot, 8082 untk api simrs khanza / mlite


<h3>Screenshoot</h3>
<h5>PI-Care Dashboard<h5>
<img src="https://user-images.githubusercontent.com/49970186/224895503-28f9a15e-8006-445c-ac3b-37b35a8c056d.png"><br>
<h5>Interface WA Bot<h5>
<img src="https://user-images.githubusercontent.com/49970186/224895733-041d9450-ef4c-46de-b8f0-712808c8c42d.png"><br>
