const qrcode = require('qrcode-terminal');
// const { Client, MessageMedia } = require('whatsapp-web.js');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const fil = require('./bot_env/filing.js');
const com = require('./bot_env/compression.js');
const dbm = require('./bot_env/db.js');
const dbm_api = require('./api_env/db')
const utils = require('./bot_env/utils/raw_function')
const api_utils = require('./api_env/utils/raw_function')
const datadir = './assets/';
const jsonfilename = 'datapendaftaran.json';

const bp = require('body-parser')
const express = require('express');
const { dirname } = require('path');
const cors = require('cors');

const wa = express();
const khanza = express();

const wa_port = 8081;
const khanza_port = 8082;
wa.use(bp.json())
wa.use(bp.urlencoded({ extended: true }))

khanza.use(cors({
  origin: '*'
}));
khanza.use(express.json());
khanza.use(
  express.urlencoded({
    extended: true,
  })
);

khanza.post("/setBooking", (req, res) => {
    let data_booking = req.body.send
    let tgl = data_booking.tanggal
    dbm_api.connection.query("SELECT COUNT(*) as jml FROM `booking_periksa` where tanggal = '"+tgl+"';", function(err, rows, fields) {
        if (err){
            throw err;
        }else{
          let ans = String(rows[0].jml + 1).padStart(4, '0')
          data_booking['email'] = "admin_PICare@gmail.com"
          data_booking['tambahan_pesan'] = "pendaftaran pasien melalui layanan PI-Care"
          data_booking['no_booking'] = "BP"+data_booking.tanggal.split("-").join('')+""+ans
          data_booking['status'] = 'Belum Dibalas'
          dbm_api.insertData(data_booking)// console.log()
          res.sendStatus(200);
        }
      });
});

khanza.post("/getVerifikasi", (req, res) => {
    let no_rm = req.body.no_rm
    let tgl_periksa = req.body.tgl_periksa
    dbm_api.connection.query("select * from get_verifikasi_wa as a where a.no_rkm_medis = '"+no_rm+"' and a.tgl_registrasi = '"+tgl_periksa+"';", function(err, rows, fields) {
        if (err){
            throw err;
        }else{
          res.json(rows).status(200)
        }
      });
});

khanza.post("/cekDataDaftar", (req, res) => {
    let rm = req.body.no_rm
    dbm_api.connection.query("SELECT * FROM get_verifikasi_wa where no_rkm_medis = '"+rm+"' and (tgl_registrasi = date(curdate()) or tgl_registrasi = date(curdate()+1) or tgl_registrasi = date(curdate()-1))  ", function(err, rows, fields) {
        if (err){
            throw err;
        }else{
          res.json(rows);
        }
    });
});

khanza.post("/getDataPasien", (req, res) => {
  // console.log(req.body)
  let nama = req.body.nama
  let tgl_lahir = req.body.tgl_lahir
  if(nama!=""&&tgl_lahir==""){
    dbm_api.connection.query("SELECT no_rkm_medis, nm_pasien, DATE(tgl_lahir) as tgl FROM pasien where nm_pasien like '%"+nama+"%'", function(err, rows, fields) {
      if (err){
          throw err;
      }else{
        res.json(rows);
      }
    });
  }else if(tgl_lahir!=""&&nama==""){
    dbm_api.connection.query("SELECT no_rkm_medis, nm_pasien, DATE(tgl_lahir) as tgl FROM pasien where tgl_lahir = '"+tgl_lahir+"'", function(err, rows, fields) {
      if (err){
          throw err;
      }else{
        res.json(rows);
      }
    });
  }else if(tgl_lahir==""&&nama==""){

  }else if(tgl_lahir!=""&&nama!=""){
    dbm_api.connection.query("SELECT no_rkm_medis, nm_pasien, DATE(tgl_lahir) as tgl FROM pasien where nm_pasien like '%"+nama+"%' and tgl_lahir = '"+tgl_lahir+"'", function(err, rows, fields) {
      if (err){
          throw err;
      }else{
        res.json(rows);
      }
    });
  }
  
});

khanza.post("/daftarBaruPasienLama", (req, res) => {
    let data_raw = req.body.send
    let poli = req.body.send.kd_poli
    let tanggal = req.body.send.tanggal_periksa
    let kd_dokter = req.body.send.kd_dokter
    dbm_api.connection.query("SELECT count(*) as antrian_terakhir FROM `reg_periksa` WHERE tgl_registrasi = '"+tanggal+"' and kd_poli = '"+poli+"' and kd_dokter  = '"+kd_dokter+"';", function(err, rows, fields) {
        if (err){
            throw err;
        }else{
            data_raw['status'] = 'belum'
            data_raw['limit_reg'] = '1'
            data_raw['no_reg'] = api_utils.antrian(rows)
            dbm_api.insertDataLama(data_raw)
            res.json(
                "data berhasil disimpan"
            );
        }
    });
});

khanza.get("/getPoli", (req, res) => {
    let rm = req.body.no_rm
    dbm_api.connection.query("SELECT kd_poli, nm_poli FROM `poliklinik`", function(err, rows, fields) {
        if (err){
            throw err;
        }else{
            res.json(rows);
        }
    });
});

khanza.post("/getRM", (req, res) => {
  let rm = req.body.no_rm
  dbm_api.connection.query("SELECT no_rkm_medis FROM `pasien` where no_rkm_medis = '"+rm+"' limit 1", function(err, rows, fields) {
      if (err){
          throw err;
      }else{
          if(rows.length>0){
            res.json(rows);
          }else{
            res.json('data tidak terdaftar');
          }
      }
  });
});

khanza.get("/getPoliDokter", (req, res) => {
    let rm = req.body.no_rm
    dbm_api.connection.query("SELECT kd_poli, nm_poli FROM `poliklinik` where status = '1'", function(err, rows1, fields) {
        if (err){
            throw err;
        }else{
            dbm_api.connection.query("SELECT kd_dokter, nm_dokter FROM `dokter` where status = '1'", function(err, rows2, fields) {
              if (err){
                  throw err;
              }else{
                dbm_api.connection.query("SELECT kd_pj, png_jawab FROM `penjab` where status = '1'", function(err, rows3, fields) {
                    if (err){
                        throw err;
                    }else{
                        res.json({
                          poli:rows1,
                          dokter:rows2,
                          penjab:rows3,
                        });
                    }
                });
              }
            }); 
        }
    });
});


const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  }
  // puppeteer: {
  //   executablePath: "/opt/google/chrome/google-chrome",
  // }
});
// const client = new Client();

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// send message to client
wa.post('/sendToClient', (req, res) => {
  if(req.body.hapus_id!==undefined){
    id = req.body.hapus_id
    no_wa = req.body.no
    message = req.body.message
    fil.removeData(datadir,jsonfilename,id)
  }else{
    no_wa = req.body.no
    message = req.body.message
  }
  client.sendMessage(no_wa+"@c.us", message)
  .then(
    ()=>{
      res.sendStatus(200)
    }
  );
});

client.on('ready', () => {
  
  console.log('Client is ready!');
  wa.listen(wa_port, () => {
    console.log(`whatsapp-bot listening at http://localhost:${wa_port}`)
  });
  khanza.listen(khanza_port, () => {
    console.log(`khanza_api listening at http://localhost:${khanza_port}`)
  });
  
  // console.time('Services start');
});

client.on('message', async (message) => {
  // delayer
  if(utils.timestamp_checker(message._data.id.remote.split('@')[0],message.timestamp)){   

    //menu registrasi form
    if(message.body === '2'){
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===0){
        if(utils.getJamLayanan()){
          utils.state_checker(message._data.id.remote,2)
          // console.log(fil.array_search(utils.temp_state_user,message._data.id.remote)[2])
          // console.log(getState(state,message._data.id.remote));
          media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/cara reply dan upload.mp4');
		      client.sendMessage(message.from,media,{caption: 'video tutorial cara reply dan upload berkas lampiran'});
		      media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/full.mp4');
		      client.sendMessage(message.from,media,{caption: 'video tutorial cara pendaftaran online'});
          client.sendMessage(message.from,"Silahkan Lengkapi Data Diri Anda & Dokumen-Dokumen yang diperlukan \n");
          client.sendMessage(message.from,"Dimohon Untuk Mengisi Form pendaftaran sesuai format dengan menyalin form isian dibawah ini \n");
          client.sendMessage(message.from,utils.form_data_diri);
          client.sendMessage(message.from,utils.info_tambahan);
          client.sendMessage(message.from,utils.info_tambahan2);
          client.sendMessage(message.from,utils.info_tambahan3);
        }else{
          client.sendMessage(message.from,utils.flagbuka_tutup());
        }
      }
    }
    
    //menu cara pengisian
    else if((message.body === '1'||message.body.toLocaleLowerCase() === 'contoh isian form')){
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===0){
        let media = null
        client.sendMessage(message.from,'Berikut Merupakan cara pengisian Form Pendaftaran Layanana Rawat Jalan Rumah Sakit Pelita Insani');
        for (let index = 0; index < 3; index++) {
          media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/'+(index+1)+'.jpg');
          client.sendMessage(message.from,media);
        }
        media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/full.mp4');
        client.sendMessage(message.from,media);
        media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/cara reply dan upload.mp4');
        client.sendMessage(message.from,media);
      }
    }

    //menu cara 
    else if(message.body === '3'){
      let media = null
      client.sendMessage(message.from,utils.list_kata_kunci);
    }

    else if(message.body === '4'){
      let media = null
	    media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/3.jpg');
      client.sendMessage(message.from,media,{caption: 'Jadwal Poli Harian Dokter'});
    }

    else if(message.body === '5'){
      client.sendMessage(message.from,utils.announcement)
    }

    else if(message.body.toLocaleLowerCase() === 'halo'){
      utils.state_checker(message._data.id.remote,0)
      client.sendMessage(message.from,utils.header);
      client.sendMessage(message.from,utils.flag);
      client.sendMessage(message.from,utils.string_menu);
    }
  
    else if(message.body.toLocaleLowerCase() === 'batal'){
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          id_daftar = message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDDATEoday()
          fil.removeData(datadir,jsonfilename,id_daftar)
          utils.state_checker(message._data.id.remote,0)
          message.reply("Pengisian Form Dibatalkan");
          client.sendMessage(message.from,utils.string_menu);
        }
      }
    }

    else if(message.body.toLocaleLowerCase() === 'selesai isi'){
      // console.log(getState(state,message._data.id.remote));
      if(message._data.quotedMsg===undefined){
        message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
      }else{
        utils.state_checker(message._data.id.remote,0)
        let inf = dbm.insertData(message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDateToday())
        // console.log(inf)
        message.reply("Terimakasih Tn/Ny. "+message._data.notifyName+" Atas Partisipasi Anda, silahkan menunggu konfirmasi Admin kami. Terimakasih");
      }
    }
  
    else if(utils.combination_check(message.body.toLocaleLowerCase(),"form pendaftaran pasien")){
      // console.log(getState(state,message._data.id.remote));
      // console.log(fil.array_search(utils.temp_state_user,message._data.id.remote)[2])
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
        let data = message.body
        const result = data.split(/\r?\n/);
        let dataDaftar = {
          'id_daftar':utils.escape(message._data.id.remote.split('@')[0]+''+utils.removeSpasi(result[2].split(":")[1])+''+utils.getDateToday()),
          'Nama':utils.escape(utils.removeSpasi(result[1].split(":")[1])),
          'NIK':utils.escape(utils.removeSpasi(result[2].split(":")[1])),
          'Alamat':utils.escape(utils.removeSpasi(result[3].split(":")[1])),
          'Jenis_Bayar':utils.escape(utils.removeSpasi(result[4].split(":")[1])),
          'Poli_tujuan':utils.escape(utils.removeSpasi(result[5].split(":")[1]))+'_'+utils.escape(utils.removeSpasi(result[6].split(":")[1])),
          'no_wa':message._data.id.remote.split('@')[0],
          'nama_penjamin':utils.escape(utils.removeSpasi(result[7].split(":")[1])),
          'nama_ibu':utils.escape(utils.removeSpasi(result[8].split(":")[1])),
          'no_penjamin':utils.escape(utils.removeSpasi(result[9].split(":")[1])),
        }
        if(fil.checker(dataDaftar)){
          if(fil.search_data('./assets/','datapendaftaran.json',dataDaftar.id_daftar)=='data not found'){
            fil.tambahData('./assets/','datapendaftaran.json',dataDaftar)
            message.reply(utils.berhasil);
            console.log(dataDaftar)
          }else{
            client.sendMessage(message.from,"Data NIK yang anda gunakan sudah terdaftar pada hari ini, jika ada perubahan data silahkan batalkan reservasi terlebih dahulu");
          }
        }else{
          message.reply("silahkan isi form dengan data lengkap, terimakasih");
        }
      }
    }
  
    //upload kartu bpjs
    else if(utils.combination_check(message.body.toLocaleLowerCase(),"upload kartu jaminan kesehatan")){
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              if(utils.typeFile(mediafile.mimetype)){
                // let nama = message.body.split(':')[1]
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuAsuransi.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDateToday()
                      let temp_nama = utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                          datadir,
                          jsonfilename,
                          id_daftar,
                          fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'KartuAsuransi','value':utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuAsuransi.'+mediafile.mimetype.split("/")[1]})
                      )
                      com.compress(utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuAsuransi.'+mediafile.mimetype.split("/")[1])
                      message.reply("Dokumen Kartu Jaminan Kesehatan Tn/Ny."+temp_nama+" Berhasil Disimpan");
                    }
                  }
                );
              }else{
                message.reply("Silahkan mengirim dokumen lampiran hanya berupa foto (img,png,jpeg,jpg)");    
              }
            }
          }
          else{
            message.reply("Silahkan mengirim dokumen lampiran sesuai dengan format yang telah ditentukan ketik \"Contoh Isian Form\" untuk petunjuk pengisian form ");
          }
        }
      }
    }
  
    //upload KTP
    else if(utils.combination_check(message.body.toLocaleLowerCase(),"upload ktp")){
      console.log(fil.array_search(utils.temp_state_user,message._data.id.remote))
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
      // if(getState(state,message._data.id.remote)==2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              if(utils.typeFile(mediafile.mimetype)){
                // let nama = message.body.split(':')[1]
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KTP.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDateToday()
                      let temp_nama = utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'KTP','value':utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KTP.'+mediafile.mimetype.split("/")[1]})
                        )
                      com.compress(utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KTP.'+mediafile.mimetype.split("/")[1])
                      message.reply("Dokumen KTP Tn/Ny."+temp_nama+" Berhasil Disimpan");
                    }
                  }
                );
              }else{
                message.reply("Silahkan mengirim dokumen lampiran hanya berupa foto (img,png,jpeg,jpg)");    
              }
            }
          }
          else{
            message.reply("Silahkan mengirim dokumen lampiran sesuai dengan format yang telah ditentukan ketik \"Contoh Isian Form\" untuk petunjuk pengisian form ");
          }
        }
      }
    }
  
    //upload Kartu RS
    else if(utils.combination_check(message.body.toLocaleLowerCase(),"upload kartu berobat")){
      //
       if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              // console.log(nama)
              // nama = nama.replace(/\s/g, '')
              if(utils.typeFile(mediafile.mimetype)){
                fs.writeFile(
                  "./upload/" +utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuRSPI.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDateToday()
                      let temp_nama = utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'KartuRSPI','value':utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuRSPI.'+mediafile.mimetype.split("/")[1]})
                        )
                        com.compress(utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuRSPI.'+mediafile.mimetype.split("/")[1])
                      message.reply("Dokumen Kartu Identitas Berobat Tn/Ny."+temp_nama+" Berhasil Disimpan");
                    }
                  }
                );
              }else{
                message.reply("Silahkan mengirim dokumen lampiran hanya berupa foto (img,png,jpeg,jpg)");    
              }
            }
          }
          else{
            message.reply("Silahkan mengirim dokumen lampiran sesuai dengan format yang telah ditentukan ketik \"Contoh Isian Form\" untuk petunjuk pengisian form ");
          }
        }
      }
    }
  
    //upload Kartu GL
    else if(utils.combination_check(message.body.toLocaleLowerCase(),"upload gl")){
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
      // if(getState(state,message._data.id.remote)==2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              // console.log(nama)
              // nama = nama.replace(/\s/g, '')
              if(utils.typeFile(mediafile.mimetype)){
                fs.writeFile(
                  "./upload/" +utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'GL.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDateToday()
                      let temp_nama = utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'GL','value':utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'GL.'+mediafile.mimetype.split("/")[1]})
                        )
                        com.compress(utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'GL.'+mediafile.mimetype.split("/")[1])
                      message.reply("Dokumen Guarantee Letter Tn/Ny."+temp_nama+" Berhasil Disimpan");
                    }
                  }
                );
              }else{
                message.reply("Silahkan mengirim dokumen lampiran hanya berupa foto (img,png,jpeg,jpg)");    
              }
            }
          }
          else{
            message.reply("Silahkan mengirim dokumen lampiran sesuai dengan format yang telah ditentukan ketik \"Contoh Isian Form\" untuk petunjuk pengisian form ");
          }
        }
      }
    }
  
    //upload Kartu SR
    else if(utils.combination_check(message.body.toLocaleLowerCase(),"upload surat rujukan")){
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
      // if(getState(state,message._data.id.remote)==2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              if(utils.typeFile(mediafile.mimetype)){
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SR.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDateToday()
                      let temp_nama = utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'SR','value':utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SR.'+mediafile.mimetype.split("/")[1]})
                        )
                        com.compress(utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SR.'+mediafile.mimetype.split("/")[1])
                      message.reply("Dokumen Surat Rujukan Tn/Ny."+temp_nama+" Berhasil Disimpan");
                    }
                  }
                );
              }else{
                message.reply("Silahkan mengirim dokumen lampiran hanya berupa foto (img,png,jpeg,jpg)");    
              }
            }
          }
          else{
            message.reply("Silahkan mengirim dokumen lampiran sesuai dengan format yang telah ditentukan ketik \"Contoh Isian Form\" untuk petunjuk pengisian form ");
          }
        }
      }
    }
  
    //upload Kartu SK
    else if(utils.combination_check(message.body.toLocaleLowerCase(),"upload surat kontrol")){
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
      // if(getState(state,message._data.id.remote)==2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              if(utils.typeFile(mediafile.mimetype)){
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SK.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+utils.getDateToday()
                      let temp_nama = utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'SK','value':utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SK.'+mediafile.mimetype.split("/")[1]})
                        )
                      com.compress(utils.removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SK.'+mediafile.mimetype.split("/")[1])
                      message.reply("Dokumen Surat Kontrol Tn/Ny."+temp_nama+" Berhasil Disimpan");
                    }
                  }
                );
              }else{
                message.reply("Silahkan mengirim dokumen lampiran hanya berupa foto (img,png,jpeg,jpg)");    
              }
            }
          }
          else{
            message.reply("Silahkan mengirim dokumen lampiran sesuai dengan format yang telah ditentukan ketik \"Contoh Isian Form\" untuk petunjuk pengisian form ");
          }
        }
      }
    }
  
    
    else if(message.body.toLocaleLowerCase() === '#@debug'){
      console.log(message)
      // console.log(utils.removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]))
    }
    
    
    else {
      if(fil.array_search(utils.temp_state_user,message._data.id.remote)[2]===2){
        media = null
        media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/contoh berhasil berhasil.jpg');
        message.reply("Proses yang anda lakukan salah / Kata Kunci yang anda gunakan tidak sesuai, silahkan ikuti Perintah Berikut.");
        client.sendMessage(message.from,media,{caption: 'Contoh Jika Proses Upload Dokumen berhasil, jangan lupa reply pesan form pendaftaran anda.'});
        client.sendMessage(message.from,list_kata_kunci);
      }else{
        client.sendMessage(message.from,"Silahkan Gunakan Kata Kunci \"Halo\" Untuk Mengaktifkan Fitur Layanan");
      }
      }

  }
});
