# WA-Bot

*jika anda mengalami kesulitan feel free to contact me at

![Twitter URL](https://img.shields.io/twitter/url?label=%40cimolgemay&style=social&url=https%3A%2F%2Ftwitter.com%2Fcimolgemay)

<h3>Requirement</h3>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Dependency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://nodejs.org/en/" target="_blank">Node JS</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/body-parser" target="_blank">Body-Parser</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/compress-images" target="_blank">compress-images</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/fs-extra" target="_blank">fs-extra</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/gifsicle" target="_blank">gifsicle</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/pngquant-bin" target="_blank">pngquant-bin</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/mysql" target="_blank">mysql</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/whatsapp-web.js" target="_blank">whatsapp-web.js</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/qrcode-terminal" target="_blank">qrcode-terminal</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/pm2" target="_blank">PM2</a></td>
    </tr>
    <tr>
      <td><a href="https://www.npmjs.com/package/cors" target="_blank">CORS</a></td>
    </tr>
  </tbody>
</table>

<h3>Cara Instalasi</h3>

  1. Pastikan Node Js, npm, dan aplikasi xampp/lampp/mampp sudah terinstal
  2. buat database pendaftaran_pasien menggunakan import query dari folder assets/db/pendaftaran_pasien.sql
  3. buka file query pada assets/db/sql_view.sql
  4. pada database sik (simrs Khanza / Mlite) jalankan query berikut untuk membuat procedure dan view<br>
  5. jalankan query dibawah comment -- ready view 
  6. jalankan query dibawah comment -- ready datetoday 
  7. jalankan query dibawah comment -- view jadwal poli 
  8. install semua dependency menggunakan command berikut
  
   ```sh
   npm i body-parser compress-images express fs-extra gifsicle mysql pngquant-bin qrcode-terminal whatsapp-web.js cors
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
