const qrcode = require('qrcode-terminal');
// const { Client, MessageMedia } = require('whatsapp-web.js');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const fil = require('./filing.js');
const com = require('./compression.js');
const dbm = require('./db.js');
const datadir = './assets/';
const jsonfilename = 'datapendaftaran.json';

const bp = require('body-parser')
const express = require('express');
const { dirname } = require('path');
const app = express();
const port = 8081;
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const client = new Client({
  authStrategy: new LocalAuth()
});
// const client = new Client();

function typeFile(params) {
  let state = false
  if(params ==  'image/jpeg'){
    state = true
  }
  return state
}

client.initialize();

function getDateToday() {
  let currentDate = new Date()
  let besk = new Date()
  besk.setDate(currentDate.getDate()+1)
  return besk.getFullYear()+''+(besk.getMonth() + 1)+''+besk.getDate()
}

function getJamLayanan() {
  const jam_buka = "08:00:00";
  const jam_tutup = "12:00:00";
  const regExp = /(\d{1,2})\:(\d{1,2})\:(\d{1,2})/;
  let timeStamp= Date.now()
  let now= new Date(timeStamp);
  let time = ("0" + now.getHours()).slice(-2) + ":" 
          + ("0" + now.getMinutes()).slice(-2)+ ":"
          + ("0" + now.getSeconds()).slice(-2);
    if((parseInt(time.replace(regExp, "$1$2$3")) >= parseInt(jam_buka.replace(regExp, "$1$2$3")))
    &&(parseInt(time.replace(regExp, "$1$2$3")) <= parseInt(jam_tutup.replace(regExp, "$1$2$3")))){
      return true
    }else{
      return false
    }
}
//momment
//0. idle
//n. menu ke n

var state = [];

//fungsi hapus spasi depan
function removeSpasi(string) {
  let inf = []
  string.split('').forEach(ele => {
      inf.push(ele)
  });
  let i=0
  while(i<inf.length){
      if(inf[i]!=' '){
          break
      }
      i++;
  }
  let removd_idx=[]
  for (let index = 0; index < i; index++) {
      removd_idx.push(index)
  }
  
  removd_idx.forEach(ele => {
      inf.splice(0,1);
  });
  return inf.join("")
}

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

function getBrosur(path) {
  return fs.readdirSync(path) 
}

function create_state(id,state_moment,id_daftar=null){
  if(state.includes(id)){
    // console.log(state[id])
  }else{
    if(id_daftar!=null){
      data = [id,state_moment,id_daftar]
    }else{
      data = [id,state_moment]
    }
    state.push(data)
    // console.log(data)
  }
}

function changeState(master,keyfind=null,data=null) {
  if(keyfind!=null&&data!=null){
      master.forEach(function callback(value,index){
          if(value[0]==keyfind){
              master[index][1] = data
          }
      });
  }
  return master
}

function combination_check(string,target){
  if(string.includes(target)){
    return true
  }else{
    return false
  }
}

// send message to client
app.post('/sendToClient', (req, res) => {
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
  app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
  });
  // console.time('Services start');
});

let header=
"Assalamualaikum Wr. Wb, Selamat datang di Pelita Insani Care (PI-Care)\n"+
"Jika Anda Pengguna Baru Layanan PI-Care, dianjurkan untuk \n"+
"terlebih dahulu mengakses menu 1 untuk informasi \n"+
"mengenai cara pendaftaran melalui layanan WA PI-Care \n"+ 
"Terimakasih Atas partisipasi Anda";

let string_menu= 
"Assalamualaikum Wr. Wb, Selamat datang di Help Desk Rumah Sakit Pelita Insani\n"+
"Silahkan pilih menu dengan mengirimkan angka pada menu yang tersedia\n"+
"1. Informasi Pengisian Form Pendaftaran Rawat Jalan\n"+
"2. Daftar Rawat Jalan\n"+
"3. List Kata Kunci WA Robot\n"+
"0. Kembali";

let list_kata_kunci=
"List Kata Kunci Upload :\n"+
"1. \"Upload KTP\" untuk upload dokumen KTP \n"+
"2. \"Upload Kartu Jaminan Kesehatan\" untuk upload dokumen Kartu Jaminan Kesehatan \n"+
"3. \"Upload Kartu Berobat\" untuk upload dokumen Kartu Identitas Berobat Rumah Sakit Pelita Insani\n"+
"4. \"Upload GL\" untuk upload dokumen Guaranteee Letter\n"+
"5. \"Upload Surat Kontrol\" untuk upload dokumen Surat Kontrol\n"+
"6. \"Upload Surat Rujukan\" untuk upload dokumen Surat Rujukan\n"+
"7. \"Halo\" untuk aktivasi layanana Robot WA\n"+
"8. \"Batal\" untuk pembatalan registrasi sebelum proses registrasi diselesaikan\n"+
"9. \"Selesai Isi\" untuk Menyelesaikan Proses Regsitrasi Rawat Jalan\n";

function TStoT(unix_timestamp=null){
  if(unix_timestamp){
    var date = new Date(unix_timestamp * 1000);
    var formattedTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return formattedTime
  }else{
    console.log("parameter kosong");
  }
}

var temp_data_user = []
var temp_state_user = []

let contoh_pengisian;

let form_data_diri= 
"Form Pendaftaran Pasien\n"+
"Nama : \n"+
"NIK  : \n"+
"Alamat  : \n"+
"Jenis Bayar : (BPJS, Umum, Asuransi atau Pihak Ketiga) Pilih Salah Satu tanpa Tanda Kurung\n"+
"Poli Tujuan : \n"+
"Dokter Tujuan : \n"+
"Nama Penanggung Jawab : \n"+
"Nama Ibu Kandung : \n"+
"No Telp Penanggung Jawab : ";

let info_tambahan=
"Silahkan Lengkapi dokumen lainnya seperti \n"+
"1. Foto KTP \n"+
"2. Foto Kartu Jaminan Kesehatan (BPJS atau Asuransi Kesehatan Lainnya Jika Memiliki)\n"+
"3. Foto Kartu Peserta Berobat RS Pelita Insani (Jika Memiliki)\n"+
"4. Jika Menggunakan BPJS Lampirkan Surat Rujukan, Surat Kontrol (jika ingin kontrol)\n"+
"5. Jika Menggunakan Pihak Ketiga Lampirkan Guarrantee Letter (GL)";

let info_tambahan2="Kirim kode konfirmasi \"Contoh Isian Form\" Tanpa Tanda Petik \n Jika ingin melihat Contoh Pengisian Form pendaftaran pasien\n";
let info_tambahan3="Foto Dokumen dengan jelas dan terbaca. jika sudah selesai mengirim semua data, Kirim kode konfirmasi \"Selesai Isi\" Tanpa Tanda Petik";

function getState(master,keyfind=null) {
  let data;
  if(keyfind!=null){
      master.forEach(ele=>{
          if(ele[0]==keyfind){
              data = ele[1]
          }
      });
      return data
  }
}

function timestamp_checker(notelp,timestamp) {
  let now = Date.now()
  let found = fil.array_search(temp_data_user,notelp)
  if(found[1]){
    let diff = now - temp_data_user[found[0]].last_req
    if(diff>3000){
      temp_data_user[found[0]].last_req = now
      return true
    }else{
      return false
    }
  }else{
    temp_data_user.push(
        {
          "idx":temp_data_user.length,
          "notelp":notelp,
          "last_req":timestamp,
        }
      )
    return true
  }
}

function state_checker(notelp,setstate) {
  // let now = Date.now()
  let found = fil.array_search(temp_state_user,notelp)
  if(found[1]){
    temp_state_user[found[0]].state = setstate
  }else{
    temp_state_user.push(
        {
          "idx":temp_state_user.length,
          "notelp":notelp,
          "state":0,
        }
      )
  }
}

client.on('message', async (message) => {
  // delayer
  if(timestamp_checker(message._data.id.remote.split('@')[0],message.timestamp)){
  //menu keluhan
    // if (message.body === '1'&&typeof(getState(state,message._data.id.remote))!='undefined') {
    //   state = changeState(state,message._data.id.remote,1)
    //   console.log(getState(state,message._data.id.remote));
    //   client.sendMessage(message.from,""+
    //   "Silahkan Kirim Kan Keluhan Anda Mengenai Layanan \n"+
    //   "WA Help Desk Pelita Insani & Sertakan Screenshoot permasalahan yang anda hadapi (hanya jika ada)\n"+
    //   "Jika Telah Selesai mengirim semua pesan Keluhan beserta Lampiran Screenshoot (hanya jika ada)\n"+
    //   "Kirim kode konfirmasi \"Selesai Isi\" Tanpa Tanda Petik"+
    //   "");
    // }
    
    //menu registrasi form
    if(message.body === '2'){
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===0){
        if(getJamLayanan()){
          state_checker(message._data.id.remote,2)
          console.log(fil.array_search(temp_state_user,message._data.id.remote)[2])
          // console.log(getState(state,message._data.id.remote));
          client.sendMessage(message.from,"Silahkan Lengkapi Data Diri Anda & Dokumen-Dokumen yang diperlukan \n");
          client.sendMessage(message.from,"Dimohon Untuk Mengisi Form pendaftaran sesuai format dengan menyalin form isian dibawah ini \n");
          client.sendMessage(message.from,form_data_diri);
          client.sendMessage(message.from,info_tambahan);
          client.sendMessage(message.from,info_tambahan2);
          client.sendMessage(message.from,info_tambahan3);
        }else{
          client.sendMessage(message.from,
          "Mohon Maaf Pendaftaran Layanan Rawat Jalan Pada Hari Ini Telah di Tutup,\n"+
          "silahkan coba lagi besok hari, Terimakasih.\n"+
          "Jam Layanan Pendaftaraan Online Robot PI-Care 08:00 - 15:00 WITA");
        }
      }
    }
    
    //menu cara pengisian
    else if((message.body === '1'||message.body.toLocaleLowerCase() === 'contoh isian form')){
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===0){
        let media = null
        client.sendMessage(message.from,'Berikut Merupakan cara pengisian Form Pendaftaran Layanana Rawat Jalan Rumah Sakit Pelita Insani');
        for (let index = 0; index < 3; index++) {
          media = MessageMedia.fromFilePath('./assets/dokumentasi/guide/'+(index+1)+'.jpg');
          client.sendMessage(message.from,media);
        }
      }
    }

    //menu cara 
    else if(message.body === '3'){
      // state = changeState(state,message._data.id.remote,3);
      console.log(getState(state,message._data.id.remote));
      let media = null
      client.sendMessage(message.from,list_kata_kunci);
    }

    else if(message.body.toLocaleLowerCase() === 'halo'){
      // create_state(message._data.id.remote,0);
      state_checker(message._data.id.remote,0)
      // console.log(temp_state_user)
      console.log()
      client.sendMessage(message.from,header);
      client.sendMessage(message.from,string_menu);
    }
  
  
    //menu informasi & brosur
    // else if(message.body === '3'&&typeof(getState(state,message._data.id.remote))!='undefined'){
    //   console.log(getState(state,message._data.id.remote));
    //   let data = getBrosur('./assets/dokumentasi/brosur')
    //   let media = null
    //   client.sendMessage(message.from,'Berikut Merupakan Brosur & Infromasi Mengenai Layanan Rumah Sakit Pelita Insani');
    //   for (let index = 0; index < data.length; index++) {
    //     media = MessageMedia.fromFilePath('./assets/dokumentasi/brosur/'+(index+1)+'.jpg')
    //     client.sendMessage(message.from,media);
    //   }
    // }
  
    else if(message.body.toLocaleLowerCase() === 'batal'){
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          id_daftar = message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday()
          fil.removeData(datadir,jsonfilename,id_daftar)
          state = changeState(state,message._data.id.remote,0);
          message.reply("Pengisian Form Dibatalkan");
          client.sendMessage(message.from,string_menu);
        }
      }
    }

    // else if(message.body == '0'){
    //   console.log(getState(state,message._data.id.remote))
    //   if((getState(state,message._data.id.remote)==2||getState(state,message._data.id.remote)==1)&&getState(state,message._data.id.remote)!=0){
    //   state = changeState(state,message._data.id.remote,0);
    //   client.sendMessage(message.from,string_menu);
    //   }
    // }

    else if(message.body.toLocaleLowerCase() === 'selesai isi'){
      // console.log(getState(state,message._data.id.remote));
      if(message._data.quotedMsg===undefined){
        message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
      }else{
        state_checker(message._data.id.remote,0)
        dbm.insertData(message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday())
        message.reply("Terimakasih Tn/Ny. "+message._data.notifyName+" Atas Partisipasi Anda, silahkan menunggu konfirmasi Admin kami. Terimakasih");
      }
    }
  
    else if(combination_check(message.body.toLocaleLowerCase(),"form pendaftaran pasien")){
      // console.log(getState(state,message._data.id.remote));
      console.log(fil.array_search(temp_state_user,message._data.id.remote)[2])
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
        let data = message.body
        const result = data.split(/\r?\n/);
        let dataDaftar = {
          'id_daftar':message._data.id.remote.split('@')[0]+''+removeSpasi(result[2].split(":")[1])+''+getDateToday(),
          'Nama':removeSpasi(result[1].split(":")[1]),
          'NIK':removeSpasi(result[2].split(":")[1]),
          'Alamat':removeSpasi(result[3].split(":")[1]),
          'Jenis_Bayar':removeSpasi(result[4].split(":")[1]),
          'Poli_tujuan':removeSpasi(result[5].split(":")[1])+'_'+removeSpasi(result[6].split(":")[1]),
          'no_wa':message._data.id.remote.split('@')[0],
          'nama_penjamin':removeSpasi(result[7].split(":")[1]),
          'nama_ibu':removeSpasi(result[8].split(":")[1]),
          'no_penjamin':removeSpasi(result[9].split(":")[1]),
        }
        if(fil.checker(dataDaftar)){
          if(fil.search_data('./assets/','datapendaftaran.json',dataDaftar.id_daftar)=='data not found'){
            fil.tambahData('./assets/','datapendaftaran.json',dataDaftar)
            console.log(dataDaftar)
          }else{
            client.sendMessage(message.from,"Data NIK yang anda gunakan sudah terdaftar pada hari ini, jika ada perubahan data silahkan batalkan reservasi terlebih dahulu");
          }
        }else{
          message.reply(fil.checker(dataDaftar));
        }
      }
    }
  
    //upload kartu bpjs
    else if(combination_check(message.body.toLocaleLowerCase(),"upload kartu jaminan kesehatan")){
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              if(typeFile(mediafile.mimetype)){
                // let nama = message.body.split(':')[1]
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuAsuransi.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday()
                      let temp_nama = removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                          datadir,
                          jsonfilename,
                          id_daftar,
                          fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'KartuAsuransi','value':removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuAsuransi.'+mediafile.mimetype.split("/")[1]})
                      )
                      com.compress(removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuAsuransi.'+mediafile.mimetype.split("/")[1])
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
    else if(combination_check(message.body.toLocaleLowerCase(),"upload ktp")){
      console.log(fil.array_search(temp_state_user,message._data.id.remote))
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
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
              if(typeFile(mediafile.mimetype)){
                // let nama = message.body.split(':')[1]
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KTP.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday()
                      let temp_nama = removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'KTP','value':removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KTP.'+mediafile.mimetype.split("/")[1]})
                        )
                      com.compress(removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KTP.'+mediafile.mimetype.split("/")[1])
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
    else if(combination_check(message.body.toLocaleLowerCase(),"upload kartu berobat")){
      //
       if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              // console.log(nama)
              // nama = nama.replace(/\s/g, '')
              if(typeFile(mediafile.mimetype)){
                fs.writeFile(
                  "./upload/" +removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuRSPI.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday()
                      let temp_nama = removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'KartuRSPI','value':removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuRSPI.'+mediafile.mimetype.split("/")[1]})
                        )
                        com.compress(removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'KartuRSPI.'+mediafile.mimetype.split("/")[1])
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
    else if(combination_check(message.body.toLocaleLowerCase(),"upload gl")){
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
      // if(getState(state,message._data.id.remote)==2){
        if(message._data.quotedMsg===undefined){
          message.reply("Dimohon untuk terlebih dahulu reply/balas pesan form pendaftaran yang anda kirim, terimakasih.");
        }else{
          let nama = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          let nik = message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1]
          if(typeof(nama)!='undefined'){
            if(message.hasMedia){
              // console.log(message)
              const mediafile = await message.downloadMedia();
              // console.log(nama)
              // nama = nama.replace(/\s/g, '')
              if(typeFile(mediafile.mimetype)){
                fs.writeFile(
                  "./upload/" +removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'GL.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday()
                      let temp_nama = removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'GL','value':removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'GL.'+mediafile.mimetype.split("/")[1]})
                        )
                        com.compress(removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'GL.'+mediafile.mimetype.split("/")[1])
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
    else if(combination_check(message.body.toLocaleLowerCase(),"upload surat rujukan")){
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
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
              if(typeFile(mediafile.mimetype)){
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SR.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday()
                      let temp_nama = removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'SR','value':removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SR.'+mediafile.mimetype.split("/")[1]})
                        )
                        com.compress(removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SR.'+mediafile.mimetype.split("/")[1])
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
    else if(combination_check(message.body.toLocaleLowerCase(),"upload surat kontrol")){
      if(fil.array_search(temp_state_user,message._data.id.remote)[2]===2){
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
              if(typeFile(mediafile.mimetype)){
                // console.log(nama)
                // nama = nama.replace(/\s/g, '')
                fs.writeFile(
                  "./upload/" +removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SK.'+mediafile.mimetype.split("/")[1],
                  mediafile.data,
                  "base64",
                  function (err) {
                    if (err) {
                      // console.log(err);
                      console.log("Gagal Menyimpan, Silahkan Coba Lagi")
                    }else{
                      let id_daftar = message._data.id.remote.split('@')[0]+''+removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1])+''+getDateToday()
                      let temp_nama = removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[1].split(':')[1])
                      fil.updateData(
                            datadir,
                            jsonfilename,
                            id_daftar,
                            fil.add_ele(datadir,jsonfilename,id_daftar,{'key':'SK','value':removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SK.'+mediafile.mimetype.split("/")[1]})
                        )
                      com.compress(removeSpasi(nik).replace(/\s/g, '_')+'_'+ message._data.id.remote.split("@")[0]+'_'+'SK.'+mediafile.mimetype.split("/")[1])
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
      // console.log(removeSpasi(message._data.quotedMsg.body.split(/\r?\n/)[2].split(':')[1]))
    }
    
    
    else {
      client.sendMessage(message.from,"Silahkan Gunakan Kata Kunci \"Halo\" Untuk Mengaktifkan Fitur Layanan");
    }

  }
});
