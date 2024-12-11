<?php
require '../vendor/autoload.php';
use Dotenv\Dotenv;    
    
if($_SERVER['REQUEST_METHOD']==='POST'){
    $json = file_get_contents('php://input'); 
    $data = json_decode($json, true);
    
    $dotenv = Dotenv::createImmutable(__DIR__ . '/..' );
    $dotenv->load();

    $apiKey = $_ENV['API_KEY_WEATHERAPI'];

    // Acceder a los valores
    $latitud = $data['latitud'];
    $longitud = $data['longitud'];

    $url = 'https://api.weatherapi.com/v1/forecast.json?key='.$apiKey.'&q=';
    $url .= urlencode($latitud . ' ' . $longitud) . '&days=14&aqi=no&alerts=no&lang=es';

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
    