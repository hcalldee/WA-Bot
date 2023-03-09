# WA-Bot

<h3>requirement</h3>
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
  </tbody>
</table>

<h3>Cara Instalasi</h3>
<p>
  1. Pastikan Node Js, npm, dan aplikasi xampp/lampp/mampp sudah terinstal<br>
  2. buat database pendaftaran_pasien menggunakan import query dari folder assets/db/pendaftaran_pasien.sql<br>
  3. buka file query pada assets/db/sql_view.sql<br>
  &nbsp;&nbsp;&nbsp;a. pada database sik (simrs Khanza / Mlite) jalankan query berikut untuk membuat procedure dan view<br>
  &nbsp;&nbsp;&nbsp;&nbsp;1. jalankan query dibawah comment -- ready view <br>
  &nbsp;&nbsp;&nbsp;&nbsp;2. jalankan query dibawah comment -- ready datetoday <br>
  &nbsp;&nbsp;&nbsp;&nbsp;3. jalankan query dibawah comment -- view jadwal poli <br>
  4. install semua dependency menggunakan command berikut <br>
   npm i body-parser compress-images express fs-extra gifsicle mysql pngquant-bin qrcode-terminal whatsapp-web.js cors
  <br>5. gunakan perintah <br>
    node app.js
  <br>kemudian scan qr menggunakan whatsapp yang ada pada android
</p>
