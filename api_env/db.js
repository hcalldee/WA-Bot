var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
database : 'sikok',
port     : '3306',
user     : 'root'
});
connection.connect();

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