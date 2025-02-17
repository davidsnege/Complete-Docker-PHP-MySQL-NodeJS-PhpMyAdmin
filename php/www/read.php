<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

include 'config.php';

$sql = "SELECT id, name, email FROM users"; // No mostramos pwd por seguridad
$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'email' => $row['email']
        );
    }
    echo json_encode(['status' => 'success', 'data' => $users]);
} else {
    echo json_encode(['status' => 'success', 'data' => []]);
}

$conn->close();
?>