<?php
// filepath: c:\xampp\htdocs\organizador_de_tiempo\save_schedule.php

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "schedule_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['day']) && isset($data['schedule'])) {
    $day = $data['day'];
    $schedule = $data['schedule'];

    foreach ($schedule as $slot) {
        $time = $slot['time'];
        $activity = $slot['activity'];
        $type = $slot['type'];

        $sql = "INSERT INTO schedule (day, time, activity, type) VALUES ('$day', '$time', '$activity', '$type')";
        if (!$conn->query($sql)) {
            echo json_encode(["success" => false, "message" => "Error al guardar: " . $conn->error]);
            exit;
        }
    }

    echo json_encode(["success" => true, "message" => "Horario guardado con éxito"]);
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos"]);
}

$conn->close();
?>