<?php
/**
 * CrownStone Real Estate - Favorites Module
 * Handles user favorites/wishlist
 */

header('Content-Type: application/json');
require_once 'config.php';

// Check if user is logged in for all operations
if (!isLoggedIn()) {
    jsonResponse('error', 'Please login to manage favorites');
}

$user_id = getCurrentUserId();

// ========================================
// GET USER FAVORITES
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get-all') {
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = 12;
    $offset = ($page - 1) * $limit;
    
    $query = "SELECT p.* FROM properties p 
              INNER JOIN favorites f ON p.id = f.property_id 
              WHERE f.user_id = ? 
              ORDER BY f.created_at DESC 
              LIMIT ?, ?";
    
    $stmt = $db->prepare($query);
    $stmt->bind_param("iii", $user_id, $offset, $limit);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $properties = [];
    while ($row = $result->fetch_assoc()) {
        $row['images'] = json_decode($row['images'], true) ?? [];
        $row['features'] = json_decode($row['features'], true) ?? [];
        $properties[] = $row;
    }
    
    // Get total count
    $count_stmt = $db->prepare("SELECT COUNT(*) as total FROM favorites WHERE user_id = ?");
    $count_stmt->bind_param("i", $user_id);
    $count_stmt->execute();
    $total = $count_stmt->get_result()->fetch_assoc()['total'];
    
    jsonResponse('success', 'Favorites retrieved', [
        'properties' => $properties,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => ceil($total / $limit),
            'total_items' => $total
        ]
    ]);
}

// ========================================
// ADD TO FAVORITES
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'add') {
    $property_id = (int)($_POST['property_id'] ?? 0);
    
    if ($property_id === 0) {
        jsonResponse('error', 'Property ID is required');
    }
    
    // Check if property exists
    $stmt = $db->prepare("SELECT id FROM properties WHERE id = ?");
    $stmt->bind_param("i", $property_id);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows === 0) {
        jsonResponse('error', 'Property not found');
    }
    
    // Check if already in favorites
    $stmt = $db->prepare("SELECT id FROM favorites WHERE user_id = ? AND property_id = ?");
    $stmt->bind_param("ii", $user_id, $property_id);
    $stmt->execute();
    
    if ($stmt->get_result()->num_rows > 0) {
        jsonResponse('error', 'This property is already in your favorites');
    }
    
    // Add to favorites
    $stmt = $db->prepare("INSERT INTO favorites (user_id, property_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $property_id);
    
    if ($stmt->execute()) {
        jsonResponse('success', 'Property added to favorites');
    } else {
        jsonResponse('error', 'Failed to add to favorites');
    }
}

// ========================================
// REMOVE FROM FAVORITES
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'remove') {
    $property_id = (int)($_POST['property_id'] ?? 0);
    
    if ($property_id === 0) {
        jsonResponse('error', 'Property ID is required');
    }
    
    $stmt = $db->prepare("DELETE FROM favorites WHERE user_id = ? AND property_id = ?");
    $stmt->bind_param("ii", $user_id, $property_id);
    
    if ($stmt->execute()) {
        jsonResponse('success', 'Property removed from favorites');
    } else {
        jsonResponse('error', 'Failed to remove from favorites');
    }
}

// ========================================
// CHECK IF PROPERTY IS FAVORITE
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'is-favorite') {
    $property_id = (int)($_GET['property_id'] ?? 0);
    
    if ($property_id === 0) {
        jsonResponse('error', 'Property ID is required');
    }
    
    $stmt = $db->prepare("SELECT id FROM favorites WHERE user_id = ? AND property_id = ?");
    $stmt->bind_param("ii", $user_id, $property_id);
    $stmt->execute();
    
    $is_favorite = $stmt->get_result()->num_rows > 0;
    
    jsonResponse('success', 'Status retrieved', ['is_favorite' => $is_favorite]);
}

// ========================================
// GET RECENTLY VIEWED PROPERTIES
// ========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'recently-viewed') {
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 6;
    
    $query = "SELECT p.* FROM properties p 
              INNER JOIN recently_viewed rv ON p.id = rv.property_id 
              WHERE rv.user_id = ? 
              ORDER BY rv.viewed_at DESC 
              LIMIT ?";
    
    $stmt = $db->prepare($query);
    $stmt->bind_param("ii", $user_id, $limit);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $properties = [];
    while ($row = $result->fetch_assoc()) {
        $row['images'] = json_decode($row['images'], true) ?? [];
        $properties[] = $row;
    }
    
    jsonResponse('success', 'Recently viewed properties retrieved', $properties);
}

// ========================================
// DEFAULT RESPONSE
// ========================================
jsonResponse('error', 'Invalid request');
?>
