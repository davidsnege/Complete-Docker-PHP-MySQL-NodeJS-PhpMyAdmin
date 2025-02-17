<?php
include 'config.php';

function getUsersList() {
    global $conn;
    $sql = "SELECT id, name FROM users";
    $result = $conn->query($sql);
    $users = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
    
    return $users;
}
?>