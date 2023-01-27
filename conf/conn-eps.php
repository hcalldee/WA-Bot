
<?php
function dbcon()
{
    $conn = [
        'serv'=>"localhost",
        'usr'=>"root",
        'db'=>"sikok",
    ];
    
    $mysqli = new mysqli($conn['serv'],$conn['usr'],"",$conn['db']);
    
    // Check connection
    if ($mysqli -> connect_errno) {
        echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
        exit();
    }else{
        return $mysqli;
    }
}

function sqlFetch($res)
{
    $arr = [];
    if($res->num_rows > 0){
        while($row = $res->fetch_assoc()) {
            array_push($arr,$row);
        }
    }
    return $arr;
}

function ekopre($var){
    echo '<pre>';
    echo json_encode($var,JSON_PRETTY_PRINT);
    echo '</pre>';
}
?>