// var connection = mysql.createConnection({
    // host     : 'localhost',
    // database : 'sikok',
    // port     : '3306',
    // user     : 'root'
    // });
    // connection.connect();
    
    
var mysql      = require('mysql');
var db_config = {
    host     : 'localhost',
    database : 'sikok',
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

function insertData(data) {
    let sql_base = "insert into booking_periksa "
    let sql_colval = preset_query(data) 
    let sql = sql_base+sql_colval
    connection.query(sql,(err,result)=>{
        if(err){
            console.log(sql);
            throw err
        } 
        console.log(result)
    })
}

function insertDataLama(data) {
    let sql_verify = "select count(*) as jml_data from booking_registrasi where tanggal_periksa = '"+data.tanggal_periksa+"' and no_rkm_medis = '"+data.no_rkm_medis+"';"
    let sql_base = "insert into booking_registrasi "
    let sql_colval = preset_query(data) 
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

module.exports = {
    connection,
    insertData,
    insertDataLama
}