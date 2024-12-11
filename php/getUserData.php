<?php 
require '../vendor/autoload.php';
use Dotenv\Dotenv;    

if($_SERVER['REQUEST_METHOD']==='GET'){
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..' );
    $dotenv->load();

    $apiKey = $_ENV['API_KEY_IPINFO'];
    $produccion = $_ENV['PRODUCCION'];

    //Si se esta en desarrollo no se obtiene la ip ya que al estar en local se obtendría ::1
    $ip = $produccion ? $_SERVER['REMOTE_ADDR'] : '';

    $url = 'https://ipinfo.io/'.$ip.'/json?token='.$apiKey;
    $response = file_get_contents($url);    

    if ($response === false) {
        http_response_code(400);
        header('Content-Type: application/json');

        echo json_encode([
            'error' => 'Solicitud inválida',
            'message' => 'No se pudieron obtener los datos.'
        ]);
        return;
    }        
    //Retornar encabezado
    header('Content-Type: application/json');
    //Mandar el resultado
    echo $response;
    return;
}