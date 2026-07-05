<?php
/**
 * CrownStone Real Estate - Database Configuration
 * PHP Backend Configuration File
 */

// ========================================
// DATABASE CREDENTIALS
// ========================================
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'crownstone_db');
define('DB_PORT', 3306);

// ========================================
// APPLICATION SETTINGS
// ========================================
define('APP_NAME', 'CrownStone Real Estate');
define('APP_VERSION', '1.0.0');
define('APP_URL', 'http://localhost/crownstone');
define('API_URL', 'http://localhost/crownstone-backend');
define('NODE_SERVER_URL', 'http://localhost:5000');

// ========================================
// SECURITY SETTINGS
// ========================================
define('SESSION_TIMEOUT', 3600);
define('JWT_SECRET', 'your-secret-key-change-in-production');
define('ITEMS_PER_PAGE', 12);

// ========================================
// DATABASE CONNECTION
// ========================================
try {
    $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    if ($db->connect_error) {
        die('Connection Failed: ' . $db->connect_error);
    }
    $db->set_charset("utf8mb4");
} catch (Exception $e) {
    die('Error: ' . $e->getMessage());
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function sanitize($data) {
    return htmlspecialchars(stripslashes(trim($data)), ENT_QUOTES, 'UTF-8');
}

function escape($data) {
    global $db;
    return $db->real_escape_string($data);
}

function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

function jsonResponse($status, $message, $data = null) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    echo json_encode(['status' => $status, 'message' => $message, 'data' => $data]);
    exit;
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function getCurrentUserId() {
    return isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function generateToken($length = 32) {
    return bin2hex(random_bytes($length / 2));
}

function formatCurrency($amount) {
    return '₦' . number_format($amount, 0);
}

error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error.log');

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

date_default_timezone_set('Africa/Lagos');
?>
