<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'send') {
    $name = sanitize($_POST['name'] ?? '');
    $email = sanitize($_POST['email'] ?? '');
    $phone = sanitize($_POST['phone'] ?? '');
    $message = sanitize($_POST['message'] ?? '');
    $property_id = isset($_POST['property_id']) ? (int)$_POST['property_id'] : null;
    $subject = sanitize($_POST['subject'] ?? 'Property Inquiry');
    
    $errors = [];
    if (empty($name)) $errors[] = 'Name required';
    if (empty($email) || !isValidEmail($email)) $errors[] = 'Valid email required';
    if (empty($message)) $errors[] = 'Message required';
    
    if (!empty($errors)) jsonResponse('error', implode(', ', $errors));
    
    $stmt = $db->prepare("INSERT INTO messages (name, email, phone, message, property_id, subject) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssiii", $name, $email, $phone, $message, $property_id, $subject);
    
    if ($stmt->execute()) {
        jsonResponse('success', 'Message sent successfully!');
    } else {
        jsonResponse('error', 'Failed to send message');
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'newsletter') {
    $email = sanitize($_POST['email'] ?? '');
    $name = sanitize($_POST['name'] ?? '');
    
    if (empty($email) || !isValidEmail($email)) jsonResponse('error', 'Valid email required');
    
    $stmt = $db->prepare("SELECT id FROM newsletter_subscribers WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) jsonResponse('error', 'Already subscribed');
    
    $stmt = $db->prepare("INSERT INTO newsletter_subscribers (email, name) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $name);
    
    if ($stmt->execute()) {
        jsonResponse('success', 'Subscribed successfully!');
    } else {
        jsonResponse('error', 'Subscription failed');
    }
}

jsonResponse('error', 'Invalid request');
?>
