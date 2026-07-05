<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get-all') {
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = 12;
    $offset = ($page - 1) * $limit;
    
    $min_price = isset($_GET['min_price']) ? (int)$_GET['min_price'] : 0;
    $max_price = isset($_GET['max_price']) ? (int)$_GET['max_price'] : 999999999;
    $location = isset($_GET['location']) ? sanitize($_GET['location']) : '';
    $property_type = isset($_GET['type']) ? sanitize($_GET['type']) : '';
    $bedrooms = isset($_GET['bedrooms']) ? (int)$_GET['bedrooms'] : 0;
    
    $query = "SELECT * FROM properties WHERE status = 'Available'";
    $count_query = "SELECT COUNT(*) as total FROM properties WHERE status = 'Available'";
    
    if ($min_price > 0) $query .= " AND price >= $min_price";
    if ($max_price < 999999999) $query .= " AND price <= $max_price";
    if (!empty($location)) $query .= " AND location LIKE '%" . escape($location) . "%'";
    if (!empty($property_type)) $query .= " AND property_type = '" . escape($property_type) . "'";
    if ($bedrooms > 0) $query .= " AND bedrooms >= $bedrooms";
    
    $total_result = $db->query($count_query);
    $total = $total_result->fetch_assoc()['total'];
    
    $query .= " ORDER BY is_featured DESC, created_at DESC LIMIT $offset, $limit";
    $result = $db->query($query);
    
    $properties = [];
    while ($row = $result->fetch_assoc()) {
        $row['images'] = json_decode($row['images'], true) ?? [];
        $row['features'] = json_decode($row['features'], true) ?? [];
        $properties[] = $row;
    }
    
    jsonResponse('success', 'Properties retrieved', [
        'properties' => $properties,
        'pagination' => ['current_page' => $page, 'total_pages' => ceil($total / $limit), 'total_items' => $total]
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get-single') {
    $property_id = (int)($_GET['id'] ?? 0);
    if ($property_id === 0) jsonResponse('error', 'Property ID required');
    
    $stmt = $db->prepare("SELECT * FROM properties WHERE id = ?");
    $stmt->bind_param("i", $property_id);
    $stmt->execute();
    $property = $stmt->get_result()->fetch_assoc();
    
    if (!$property) jsonResponse('error', 'Property not found');
    
    $property['images'] = json_decode($property['images'], true) ?? [];
    $property['features'] = json_decode($property['features'], true) ?? [];
    $db->query("UPDATE properties SET views = views + 1 WHERE id = $property_id");
    
    jsonResponse('success', 'Property retrieved', $property);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'search') {
    $q = sanitize($_GET['q'] ?? '');
    if (empty($q)) jsonResponse('error', 'Search term required');
    
    $search_escaped = escape($q);
    $query = "SELECT * FROM properties WHERE status = 'Available' AND (title LIKE '%$search_escaped%' OR description LIKE '%$search_escaped%' OR location LIKE '%$search_escaped%') LIMIT 20";
    $result = $db->query($query);
    
    $properties = [];
    while ($row = $result->fetch_assoc()) {
        $row['images'] = json_decode($row['images'], true) ?? [];
        $properties[] = $row;
    }
    
    jsonResponse('success', 'Search completed', $properties);
}

jsonResponse('error', 'Invalid request');
?>
