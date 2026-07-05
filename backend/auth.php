<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'register') {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $phone = sanitize($_POST['phone'] ?? '');
    
    $errors = [];
    if (empty($name)) $errors[] = 'Name is required';
    if (empty($email) || !isValidEmail($email)) $errors[] = 'Valid email is required';
    if (empty($password) || strlen($password) < 8) $errors[] = 'Password must be at least 8 characters';
    if ($password !== $confirm_password) $errors[] = 'Passwords do not match';
    
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        $errors[] = 'Email already registered';
    }
    
    if (!empty($errors)) {
        jsonResponse('error', implode(', ', $errors));
    }
    
    $hashed_password = hashPassword($password);
    $stmt = $db->prepare("INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $hashed_password, $phone);
    
    if ($stmt->execute()) {
        $user_id = $db->insert_id;
        $_SESSION['user_id'] = $user_id;
        $_SESSION['user_name'] = $name;
        jsonResponse('success', 'Registration successful!', ['user_id' => $user_id]);
    } else {
        jsonResponse('error', 'Registration failed');
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'login') {
    $email = sanitize($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        jsonResponse('error', 'Email and password required');
    }
    
    $stmt = $db->prepare("SELECT id, name, email, password, is_admin FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        jsonResponse('error', 'Invalid email or password');
    }
    
    $user = $result->fetch_assoc();
    
    if (!verifyPassword($password, $user['password'])) {
        jsonResponse('error', 'Invalid email or password');
    }
    
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['is_admin'] = $user['is_admin'];
    
    jsonResponse('success', 'Login successful!', ['user_id' => $user['id'], 'is_admin' => $user['is_admin']]);
}

if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    session_destroy();
    jsonResponse('success', 'Logged out successfully');
}

jsonResponse('error', 'Invalid request');
?>
