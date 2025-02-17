<?php

namespace Tests\TestCase;

use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    private $conn;

    protected function setUp(): void
    {
        // Fix the path to config.php
        include_once dirname(__DIR__) . '/../config.php';
        $this->conn = $conn;
    }

    public function testCreateUser()
    {
        $name = "Test User";
        $email = "test@example.com";
        $pwd = password_hash("testpassword", PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (name, email, pwd) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $pwd);
        
        $this->assertTrue($stmt->execute());
        $this->assertGreaterThan(0, $stmt->insert_id);
        
        // Limpiar después de la prueba
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $stmt->insert_id);
        $stmt->execute();
    }
}