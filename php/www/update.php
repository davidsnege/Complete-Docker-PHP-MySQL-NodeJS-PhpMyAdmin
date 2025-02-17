<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, POST');

include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "PUT") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    
    if (!empty($_POST['pwd'])) {
        $pwd = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
        $sql = "UPDATE users SET name = ?, email = ?, pwd = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $name, $email, $pwd, $id);
    } else {
        $sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $name, $email, $id);
    }

    if ($stmt->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'User updated successfully'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => $stmt->error
        ]);
    }

    $stmt->close();
    $conn->close();
}
?>