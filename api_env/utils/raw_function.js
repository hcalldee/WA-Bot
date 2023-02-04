function antrian(rows){
    return String(rows[0].antrian_terakhir + 1).padStart(3, '0')
  }
function besok_hari_apa() {
    const weekday = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const d = new Date();
  let tomorrow = new Date();
    tomorrow.setDate(d.getDate() + 1)
  let day = weekday[tomorrow.getDay()];
    return day.toLocaleUpperCase()
}
  module.exports ={
    antrian,
    besok_hari_apa
  }