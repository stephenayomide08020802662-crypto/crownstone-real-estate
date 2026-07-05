const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// GET - All Properties
app.get('/api/properties', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 12;
        const offset = (page - 1) * limit;
        
        const conn = await pool.getConnection();
        const [properties] = await conn.query(
            'SELECT * FROM properties WHERE status = "Available" ORDER BY is_featured DESC, created_at DESC LIMIT ?, ?',
            [offset, limit]
        );
        conn.release();
        
        properties.forEach(p => {
            p.images = JSON.parse(p.images || '[]');
            p.features = JSON.parse(p.features || '[]');
        });
        
        res.json({ status: 'success', data: properties, pagination: { page, limit } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Failed to fetch properties' });
    }
});

// GET - Single Property
app.get('/api/properties/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conn = await pool.getConnection();
        const [property] = await conn.query('SELECT * FROM properties WHERE id = ?', [id]);
        
        if (property.length === 0) {
            conn.release();
            return res.status(404).json({ status: 'error', message: 'Property not found' });
        }
        
        property[0].images = JSON.parse(property[0].images || '[]');
        property[0].features = JSON.parse(property[0].features || '[]');
        
        await conn.query('UPDATE properties SET views = views + 1 WHERE id = ?', [id]);
        conn.release();
        
        res.json({ status: 'success', data: property[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

// GET - Search Properties
app.get('/api/search', async (req, res) => {
    try {
        const { q, location, type, min_price, max_price, bedrooms } = req.query;
        
        let query = 'SELECT * FROM properties WHERE status = "Available"';
        let params = [];
        
        if (q) {
            query += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
            params.push(`%${q}%`, `%${q}%`, `%${q}%`);
        }
        if (location) {
            query += ' AND location LIKE ?';
            params.push(`%${location}%`);
        }
        if (type) {
            query += ' AND property_type = ?';
            params.push(type);
        }
        if (min_price) {
            query += ' AND price >= ?';
            params.push(min_price);
        }
        if (max_price) {
            query += ' AND price <= ?';
            params.push(max_price);
        }
        if (bedrooms) {
            query += ' AND bedrooms >= ?';
            params.push(bedrooms);
        }
        
        query += ' LIMIT 50';
        
        const conn = await pool.getConnection();
        const [results] = await conn.query(query, params);
        conn.release();
        
        results.forEach(p => {
            p.images = JSON.parse(p.images || '[]');
            p.features = JSON.parse(p.features || '[]');
        });
        
        res.json({ status: 'success', data: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Search failed' });
    }
});

// POST - Chatbot
app.post('/api/chatbot', (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ status: 'error', message: 'Message required' });
        }
        
        let response = '';
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = 'Hello! Welcome to CrownStone Real Estate. How can I help you find your dream home?';
        } else if (lowerMessage.includes('property') || lowerMessage.includes('house')) {
            response = 'We have many wonderful properties available! Would you like to search by location, price, or property type?';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            response = 'Our properties range from ₦28,000,000 to ₦320,000,000. What is your budget?';
        } else if (lowerMessage.includes('location') || lowerMessage.includes('area')) {
            response = 'We have properties in prime Lagos locations including Victoria Island, Lekki, Ikoyi, and more. Which area interests you?';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('agent')) {
            response = 'You can contact our agents directly through the property listings. Would you like help finding a specific property?';
        } else {
            response = 'I\'m here to help you find the perfect property! You can ask me about locations, prices, or specific property types.';
        }
        
        res.json({
            status: 'success',
            bot_response: response,
            user_message: message
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Chatbot error' });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'CrownStone API Server is running' });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`🏠 CrownStone Real Estate API Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
