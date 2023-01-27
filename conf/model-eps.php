<?php
function getData($var)
{
    $sql = "select * from booking_periksa where id_daftar = ".'"'.$var.'"';
    return sqlFetch(dbcon()->query($sql));
}

function getDataByTgl($var)
{
    $sql = "select * from booking_periksa where date(insert_at) = ".'"'.$var.'"';
    return sqlFetch(dbcon()->query($sql));
}

function getLampiran($var)
{
    $sql = "select ktp, kartu_asuransi, kartu_berobat, gl, srujuk, skontrol from epasien_dox where nik = ".'"'.$var.'"';
    return sqlFetch(dbcon()->query($sql));
}

function setVerifikasi($var)
{
    $sql = "update booking_periksa set is_verified = 2 where id_daftar = ".'"'.$var.'"';
    if(dbcon()->query($sql)===TRUE){
        return 200;
    }else{
        return 500;
    }
}

function setBatal($var)
{
    $sql = "call validate(".'"'.$var.'"'.")";
    if(dbcon()->query($sql)===TRUE){
        return 200;
    }else{
        return dbcon()->query($sql);
    }
}

// querystorevalidate
// DELIMITER $$

// CREATE PROCEDURE validate
// (
// 	id varchar(128)
// )
// BEGIN
//     update data_pendaftar set is_verified = 2 where id_daftar = id;
//     insert into batal_daftar (select * from data_pendaftar where id_daftar = id);
// 	delete from data_daftar where id_daftar = id;
// END$$

// DELIMITER ;
?>