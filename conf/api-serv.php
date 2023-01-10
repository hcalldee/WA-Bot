<?php
require_once('../conf/conn.php');
require_once('../conf/model.php');


// ekopre($_POST);
if(isset($_POST['getDataRow'])){
    $keyword  = trim(isset($_POST['getDataRow']))?trim($_POST['getDataRow']):NULL;
    echo json_encode(getData($keyword));

}else if(isset($_POST['getLampiran'])){
    $keyword  = trim(isset($_POST['getLampiran']))?trim($_POST['getLampiran']):NULL;
    echo json_encode(getLampiran($keyword)[0]);

} else if(isset($_POST['setVerifikasi'])){
    $keyword  = trim(isset($_POST['setVerifikasi']))?trim($_POST['setVerifikasi']):NULL;
    echo json_encode(setVerifikasi($keyword));

} else if(isset($_POST['setBatal'])){
    $keyword  = trim(isset($_POST['setBatal']))?trim($_POST['setBatal']):NULL;
    echo json_encode(setBatal($keyword));
} else if(isset($_POST['getDataTanggal'])){
    $keyword  = trim(isset($_POST['getDataTanggal']))?trim($_POST['getDataTanggal']):NULL;
    echo json_encode(getDataByTgl($keyword));
}
?>