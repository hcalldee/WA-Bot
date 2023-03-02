<?php
include 'LZString.php';
include 'LZReverseDictionary.php';
include 'LZData.php';
include 'LZUtil.php';
include 'LZContext.php';

function getRujukan($var)
{
    $consid = "";
    $secretKey = "";
    $userKey = "";
    date_default_timezone_set('UTC');
    $tStamp = strval(time()-strtotime('1970-01-01
    00:00:00'));
    $signature = hash_hmac('sha256',
    $consid."&".$tStamp, $secretKey, true);
    $encodedSignature =
    base64_encode($signature);
    $urlencodedSignature =
    urlencode($encodedSignature);
    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://apijkn.bpjs-kesehatan.go.id/vclaim-rest/Rujukan/Peserta/'.$var,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION =>
    CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER =>
    array('X-cons-id: '.$consid,
     'X-timestamp: '.$tStamp,
     'X-signature: '.$encodedSignature,
     'user_key: '.$userKey),
    )); 
    $response = curl_exec($curl);
    curl_close($curl);
    $data = json_decode($response, true);
    $kunci = $consid.$secretKey.$tStamp;
    $nilairespon = $data["response"];
    $hasilakhir = decompress(stringDecrypt($kunci, $nilairespon));
    return $hasilakhir;
}

function stringDecrypt($key, $string){
    $encrypt_method = 'AES-256-CBC';
    $key_hash= hex2bin(hash('sha256', $key));
    $iv = substr(hex2bin(hash('sha256', $key)), 0,
    16);
    $output =
    openssl_decrypt(base64_decode($string),
    $encrypt_method, $key_hash,
    OPENSSL_RAW_DATA, $iv);
    return $output;
}
function decompress($string){
    return \LZCompressor\LZString::decompressFromEncodedURIComponent($string);
}

// echo "Response Kunci : ".$kunci."<br>"."<br>";
// echo "Response Encrypt : ".$nilairespon;
// echo "Response Decrypt : "."<br>".$hasilakhir;
// echo '<pre>';
// print_r($hasilakhir);
// echo '</pre>';

?>

