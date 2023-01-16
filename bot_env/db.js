var fil = require('./filing')
var mysql = require('mysql');
const datadir = './assets/';
const jsonfilename = 'datapendaftaran.json';

var db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "pendaftaran_pasien" 
});

function preset_query(data) {
    let key = Object.keys(data)
    let col = "("
    for (let index = 0; index < key.length; index++) {
        if(index==(key.length-1)){
            col+=key[index]+')'
        }else{
            col+=key[index]+', '
        }
    }
    const arr = []
    Object.keys(data).forEach(key => {
        arr.push(data[key]);
    });
    let val = "("
    for (let index = 0; index < arr.length; index++) {
        if(index==(arr.length-1)){
            val+="\'"+arr[index]+"\')"
        }else{
            val+="\'"+arr[index]+"\', "
        }
    }
    
    return col+" VALUES "+val
}


// //connection
// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

// // getdata
// let sql = "SELECT * FROM daftar_pasien"
// db.query(sql,(err,result)=>{
//     if(err) throw err;
//     console.log(result)
// })

// insertdata
function insertData(id_daftar) {
    let sql_verify = "select count(*) as jml_data from daftar_pasien where id_daftar= '"+id_daftar+"';"
    let sql_base = "insert into daftar_pasien "
    let sql_colval = preset_query(fil.search_data(datadir,jsonfilename,id_daftar)[0]) 
    let sql = sql_base+sql_colval
    db.query(sql_verify,(err,rows,result)=>{
        if(err){
            console.log(sql_verify)
            throw err
        }else {
            if(rows[0].jml_data>0){
                result = 'sudah terdaftar'
                console.log(result);
                return result
            }else{
                db.query(sql,(err,result)=>{
                    if(err){
                        console.log(sql);
                        throw err
                    } 
                    console.log(result)
                })
            }
        }

    })
}

// function uploadData(id_daftar){
//     if(fil.search_data(datadir,jsonfilename,id_daftar)[0]===undefined){

//     }else{

//     }
// }

module.exports ={
    insertData
};