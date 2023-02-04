var fil = require('./filing')
var mysql = require('mysql');
const datadir = './assets/';
const jsonfilename = 'datapendaftaran.json';

var db_config = {
    host     : 'localhost',
    database : 'pendaftaran_pasien',
    port     : '3306',
    user     : 'root'
  };
  
  var connection;
  
  function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  
  handleDisconnect();

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
    connection.query(sql_verify,(err,rows,result)=>{
        if(err){
            console.log(sql_verify)
            throw err
        }else {
            if(rows[0].jml_data>0){
                result = 'sudah terdaftar'
                console.log(result);
                return result
            }else{
                connection.query(sql,(err,result)=>{
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
    insertData,
    connection,
};