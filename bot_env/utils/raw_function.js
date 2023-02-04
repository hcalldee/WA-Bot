const fil = require('../filing');

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
"4. Jadwal Dokter\n"+
"5. Pengumuman Perubahan Jadwal";

let announcement=
"PENGUMUMAN\n"+
"1. Perubahan Jadwal Poli dr. Winny hari kamis & jumat menjadi ( 14.00 - selesai )\n"+
"2. Perubahan Jadwal Poli dr. Made hari senin - sabtu menjadi ( 15.00 - 17.00 )\n"+
"3. Poli paru dr. Hendra Masih belum dibuka hingga waktu yang belum ditentukan\n"+
"4. Perubahan Jadwal Poli paru dr. Norma hari selasa & kamis menjadi ( 16.00 - 18.00 )\n"+
"5. Perubahan Jadwal Poli THT dr. Sofhia hari senin - sabtu menjadi ( 16.30 - 18.00 )\n"+
"6. Layanan Poli gigi dan mulut dr. inggar sudah tidak beroperasi\n"+
"Atas Perhatian Anda, Kami Ucapkan Terimakasih.";

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

let berhasil = 
"Data Berhasil Disimpan sementara. silahkan lanjutkan proses upload lampiran sesuai dengan jenis bayar yang anda gunakan \n \n"+
"UMUM\n KTP, Kartu Berobat *jika Memiliki\n"+
"BPJS\n KTP, Kartu BPJS , Kartu Berobat *jika Memiliki, Surat Rujukan, Surat Kontrol *jika Kontrol\n"+
"Pihak Ketiga\n KTP, Guarantee Letter, Kartu Berobat *jika Memiliki\n"+
"Asuransi\n KTP, Kartu Asuransi, Kartu Berobat *jika Memiliki, Surat Rujukan, Surat Kontrol *jika Kontrol";

let flag = 
"*LAYANAN PI-CARE HANYA UNTUK LAYANAN SATU HARI SETELAH PENDAFTARAN*\n"+
"*UNTUK PENDAFTARAN DIHARI YANG SAMA SILAHKAN DAFTAR LANGSUNG DI RUMAH SAKIT*\n\n"+
"Jadwal Layanan PI-Care \n"+
"Minggu - Jumat, 08:00-15:00\n"+
"Sabtu dan H-1 Hari Libur (tanggal merah) Tutup\n\n"+
"Pendaftaran di Hari Minggu atau Hari Libur akan dikonfirmasi Admin pada hari kerja\n"+
"Pendaftaran di Hari kerja akan di konfirmasi pada jam 03:00 siang setelah pendaftaran PI-Care ditutup silahkan ditunggu. Terimakasih";

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

function getBrosur(path) {
    return fs.readdirSync(path) 
  }
  
  function combination_check(string,target){
    if(string.includes(target)){
      return true
    }else{
      return false
    }
  }

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

  function typeFile(params) {
    let state = false
    if(params ==  'image/jpeg'){
      state = true
    }
    return state
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
  
function getDateToday() {
    let currentDate = new Date()
    let besk = new Date()
    besk.setDate(currentDate.getDate()+1)
    return besk.getFullYear()+''+(besk.getMonth() + 1)+''+besk.getDate()
  }

  function TStoT(unix_timestamp=null){
    if(unix_timestamp){
      var date = new Date(unix_timestamp * 1000);
      var formattedTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      return formattedTime
    }else{
      console.log("parameter kosong");
    }
  }
  let cth = 
  "Form Pendaftaran Pasien\n"+
  "Nama : Muhammad Fulan \n"+
  "NIK  : 0123456789101112 \n"+
  "Alamat  : Jl.Bumi \n"+
  "Jenis Bayar : Umum \n"+
  "Poli Tujuan : Penyakit Dalam \n"+
  "Dokter Tujuan : dr Fulan \n"+
  "Nama Penanggung Jawab : Ahmad Fulan \n"+
  "Nama Ibu Kandung : Siti Fulan \n"+
  "No Telp Penanggung Jawab : 0812345678"
//   exports.temp_data_user = temp_data_user

function getJamLayanan() {
  const weekday = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const d = new Date();
  let day = weekday[d.getDay()];
  let jam_buka = "";
  let jam_tutup = "";  
  
  if(day == 'Sabtu'){
	return false
  }else if(day=='Tutup'){
	return false  
  }
  else if(day == 'Minggu'){
	jam_buka = "08:00:00";
	jam_tutup = "12:00:00";
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
  else{
	jam_buka = "08:00:00";
	jam_tutup = "15:00:00";
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
}

function flagbuka_tutup(){
	const weekday = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
	const d = new Date();
	let day = weekday[d.getDay()];
	let sabtu = "Mohon Maaf Pendaftaran Layanan Rawat Jalan Pada Hari Ini Tutup,\n"+
          "tidak ada jadwal poliklinik di hari minggu, Terimakasih.";
	let minggu = "Mohon Maaf Pendaftaran Layanan Rawat Jalan Pada Hari Ini Telah di Tutup,\n"+
          "silahkan coba lagi besok hari, Terimakasih.\n"+
          "Jam Layanan Pendaftaraan Online Hari ini Robot PI-Care 08:00 - 12:00 WITA";
	let jumat = "Mohon Maaf Pendaftaran Layanan Rawat Jalan Pada Hari Ini Telah di Tutup,\n"+
          "silahkan coba lagi di hari minggu, Terimakasih.\n"+
          "Jam Layanan Pendaftaraan Online Hari Minggu Robot PI-Care 08:00 - 12:00 WITA";
	let hari_kerja = "Mohon Maaf Pendaftaran Layanan Rawat Jalan Pada Hari Ini Telah di Tutup,\n"+
          "silahkan coba lagi besok hari, Terimakasih.\n"+
          "Jam Layanan Pendaftaraan Online Hari Kerja Robot PI-Care 08:00 - 15:00 WITA";
	let tutup = "Mohon Maaf Pendaftaran Layanan Rawat Jalan Tutup,\n"+
          "silahkan coba lagi besok hari, Terimakasih.\n"+
          "Jam Layanan Pendaftaraan Online Hari Kerja Robot PI-Care 08:00 - 15:00 WITA";
	if(day=="Sabtu"){
		return sabtu
	}else if(day=="Minggu"){
		return minggu
	}else if(day=="Jumat"){
		return jumat
	}else if(day=="Tutup"){
		return tutup
	}else{
		return hari_kerja
	}
}

function escape(string) {
  return string.replace(/[^a-zA-Z0-9\s.,]/g, '');
}


  module.exports = {
    header,
    temp_state_user,
    list_kata_kunci,
    string_menu,
    temp_data_user,
    contoh_pengisian,
    form_data_diri,
    info_tambahan,
    info_tambahan2,
    info_tambahan3,
    form_data_diri,
    berhasil,
    flag,
    announcement,
    cth,
    getBrosur,
    getDateToday,
    getJamLayanan,
    flagbuka_tutup,
    state_checker,
    timestamp_checker,
    TStoT,
    typeFile,
    removeSpasi,
    combination_check,
    escape,
  }

//   export let variables = {
//     header:header,
//     str
//   }
  