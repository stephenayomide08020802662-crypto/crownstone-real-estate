-- CrownStone Real Estate - Sample Data
USE crownstone_db;

-- SAMPLE USERS
INSERT INTO users (name, email, password, phone, is_admin) VALUES 
('John Doe', 'john@example.com', '$2y$10$Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9uzZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9', '+234 800 111 1111', 0),
('Jane Smith', 'jane@example.com', '$2y$10$Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9uzZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9', '+234 800 222 2222', 0),
('Ahmed Hassan', 'ahmed@example.com', '$2y$10$Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9uzZ9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9Z9', '+234 800 333 3333', 0);

-- SAMPLE PROPERTIES
INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, square_feet, property_type, features, main_image, images, agent_name, agent_phone, agent_email, status, is_featured) VALUES 
('Luxury Villa in Victoria Island', 'Stunning 5-bedroom luxury villa with infinity pool, private gym, home cinema, and 24/7 security.', 250000000, 'Victoria Island, Lagos', 5, 4, 5500, 'House', '["Smart Home", "Infinity Pool", "Private Gym", "Home Cinema", "24/7 Security"]', 'images/property1.jpg', '["images/property1.jpg"]', 'Mr. Okafor', '+234 800 123 4567', 'okafor@crownstone.com', 'Available', 1),
('Modern Apartment in Lekki Phase 1', 'Brand new 3-bedroom modern apartment with swimming pool, gym, and world-class amenities.', 85000000, 'Lekki Phase 1, Lagos', 3, 3, 2800, 'Apartment', '["Air Conditioning", "Swimming Pool", "Gym", "Security", "Parking"]', 'images/property2.jpg', '["images/property2.jpg"]', 'Ms. Chioma', '+234 800 234 5678', 'chioma@crownstone.com', 'Available', 1),
('Cozy Studio in Ikoyi', 'Perfect starter property in upscale Ikoyi with modern amenities, rooftop access, and security.', 35000000, 'Ikoyi, Lagos', 1, 1, 650, 'Apartment', '["Furnished", "Rooftop Access", "Security", "Parking"]', 'images/property3.jpg', '["images/property3.jpg"]', 'Mr. Chukwu', '+234 800 345 6789', 'chukwu@crownstone.com', 'Available', 0),
('Spacious 4-Bedroom Townhouse in Lekki', 'Elegant townhouse with garden in Lekki Conservation Centre, modern kitchen, and rooftop terrace.', 125000000, 'Lekki Conservation Centre, Lagos', 4, 3, 3200, 'Townhouse', '["Garden", "Rooftop Terrace", "Modern Kitchen", "Parking", "Security"]', 'images/property4.jpg', '["images/property4.jpg"]', 'Mrs. Adeyemi', '+234 800 456 7890', 'adeyemi@crownstone.com', 'Available', 1),
('Prime Land Plot in Ajah', 'Prime 2-acre land plot in Ajah with excellent investment potential, close to major roads.', 45000000, 'Ajah, Lagos', 0, 0, 8712, 'Land', '["Road Access", "Level Ground", "Good Location"]', 'images/property5.jpg', '["images/property5.jpg"]', 'Mr. Okoro', '+234 800 567 8901', 'okoro@crownstone.com', 'Available', 0),
('Executive Condo in Banana Island', 'Ultra-luxury 3-bedroom condo with breathtaking views, private elevator, concierge service.', 180000000, 'Banana Island, Lagos', 3, 3, 3500, 'Condo', '["Sea View", "Private Elevator", "Concierge", "Infinity Pool", "Gym"]', 'images/property6.jpg', '["images/property6.jpg"]', 'Ms. Eze', '+234 800 678 9012', 'eze@crownstone.com', 'Available', 1),
('Modern Duplex in Shomolu', 'Beautifully designed 4-bedroom duplex with spacious rooms, modern finishes, and private parking.', 95000000, 'Shomolu, Lagos', 4, 3, 2900, 'House', '["Spacious Rooms", "Modern Finishes", "Private Parking", "Security Gate"]', 'images/property7.jpg', '["images/property7.jpg"]', 'Mr. Femi', '+234 800 789 0123', 'femi@crownstone.com', 'Available', 0),
('Affordable 2-Bedroom in Yaba', 'Excellent value apartment in central Yaba, perfect for students or young professionals.', 28000000, 'Yaba, Lagos', 2, 1, 1200, 'Apartment', '["Central Location", "Close to Transport", "Kitchen", "Balcony"]', 'images/property8.jpg', '["images/property8.jpg"]', 'Mr. Taiwo', '+234 800 890 1234', 'taiwo@crownstone.com', 'Available', 0),
('Premium Commercial Office in Victoria Island', 'Prime 2-story commercial office space in VI business district with high visibility.', 120000000, 'Victoria Island, Lagos', 0, 2, 4000, 'Apartment', '["2 Floors", "Business District", "High Visibility", "Parking"]', 'images/property9.jpg', '["images/property9.jpg"]', 'Mr. Kunle', '+234 800 901 2345', 'kunle@crownstone.com', 'Available', 1),
('Waterfront House in Lekki', 'Magnificent waterfront 5-bedroom house with beach access, saltwater pool, and lagoon view.', 320000000, 'Lekki Waterfront, Lagos', 5, 4, 6200, 'House', '["Beach Access", "Lagoon View", "Saltwater Pool", "Premium Finishes"]', 'images/property10.jpg', '["images/property10.jpg"]', 'Ms. Gloria', '+234 800 012 3456', 'gloria@crownstone.com', 'Available', 1);

-- SAMPLE NEWSLETTER SUBSCRIBERS
INSERT INTO newsletter_subscribers (email, name) VALUES 
('subscriber1@example.com', 'Newsletter User 1'),
('subscriber2@example.com', 'Newsletter User 2'),
('subscriber3@example.com', 'Newsletter User 3');

-- SAMPLE FAVORITES
INSERT INTO favorites (user_id, property_id) VALUES 
(2, 1), (2, 4), (2, 6),
(3, 2), (3, 5),
(4, 3);

-- SAMPLE MESSAGES
INSERT INTO messages (name, email, phone, message, property_id, subject) VALUES 
('Michael Johnson', 'michael@example.com', '+234 800 123 9999', 'I am interested in viewing the luxury villa. When can I schedule a visit?', 1, 'Property Inquiry'),
('Stephanie Brown', 'stephanie@example.com', '+234 800 234 9999', 'Please provide more details about the Lekki apartment.', 2, 'Additional Information'),
('David Wilson', 'david@example.com', '+234 800 345 9999', 'I would like to schedule a viewing for the waterfront house!', 10, 'Viewing Request');
