<?php
function getData($var)
{
    $sql = "select * from daftar_pasien where id_daftar = ".'"'.$var.'"';
    return sqlFetch(dbcon()->query($sql));
}

function getLampiran($var)
{
    $sql = "select KartuAsuransi, KTP, KartuRSPI from daftar_pasien where id_daftar = ".'"'.$var.'"';
    return sqlFetch(dbcon()->query($sql));
}

function setVerifikasi($var)
{
    $sql = "update daftar_pasien set is_verified = 2 where id_daftar = ".'"'.$var.'"';
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
        return 500;
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