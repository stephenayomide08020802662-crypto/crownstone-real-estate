# 🏠 CrownStone Real Estate

**Unlock Your Dream Home** - A modern, responsive real estate website for buying houses in Lagos, Nigeria.

---

## 📋 Project Overview

CrownStone Real Estate is a complete full-stack web application featuring:
- ✅ Modern responsive design (Mobile-first)
- ✅ Property listings with advanced filtering
- ✅ User authentication and dashboard
- ✅ Admin panel for property management
- ✅ AI-powered chatbot assistant
- ✅ Favorites/Wishlist system
- ✅ Contact management
- ✅ Newsletter subscription
- ✅ Recently viewed properties

---

## 🔧 Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | PHP 7.4+ (Core Logic) |
| **API Server** | Node.js with Express.js |
| **Database** | MySQL 5.7+ |
| **Design Pattern** | MVC Architecture |

---

## 📁 Project Structure

```
crownstone-real-estate/
├── frontend/
│   ├── index.html
│   ├── properties.html
│   ├── property-details.html
│   ├── login.html
│   ├── register.html
│   ├── contact.html
│   ├── dashboard.html
│   ├── admin/
│   │   ├── admin-login.html
│   │   └── admin-dashboard.html
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── admin-style.css
│   └── js/
│       ├── main.js
│       ├── auth.js
│       ├── properties.js
│       ├── chatbot.js
│       └── validation.js
│
├── backend/
│   ├── config.php
│   ├── auth.php
│   ├── properties.php
│   ├── messages.php
│   ├── favorites.php
│   └── admin.php
│
├── node-server/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── routes/
│
├── database/
│   ├── schema.sql
│   └── sample-data.sql
│
└── setup/
    └── SETUP.md
```

---

## 🚀 Quick Start

### Prerequisites
- XAMPP (PHP 7.4+, MySQL 5.7+)
- Node.js v14+
- npm or yarn

### Installation Steps

1. **Clone Repository**
   ```bash
   git clone https://github.com/stephenayomide08020802662-crypto/crownstone-real-estate.git
   cd crownstone-real-estate
   ```

2. **Database Setup**
   - Open phpMyAdmin: `http://localhost/phpmyadmin`
   - Create database: `crownstone_db`
   - Import `database/schema.sql`
   - Import `database/sample-data.sql`

3. **Backend Setup**
   ```bash
   cp -r backend/ C:/xampp/htdocs/crownstone-backend
   # Update config.php with your database credentials
   ```

4. **Frontend Setup**
   ```bash
   cp -r frontend/ C:/xampp/htdocs/crownstone
   # Update API URLs in js/main.js
   ```

5. **Node.js Server**
   ```bash
   cd node-server
   npm install
   npm start
   ```

---

## 🎯 Features

### 👤 User Features
- ✅ User Registration & Login
- ✅ Browse Properties
- ✅ Advanced Filtering (Price, Location, Type, Bedrooms)
- ✅ Property Search
- ✅ View Property Details
- ✅ Save to Favorites
- ✅ Recently Viewed Properties
- ✅ Contact Agent
- ✅ User Dashboard
- ✅ Profile Management
- ✅ Newsletter Subscription

### 🛡️ Admin Features
- ✅ Admin Login
- ✅ Add/Edit/Delete Properties
- ✅ Upload Multiple Property Images
- ✅ Manage User Messages
- ✅ View Analytics
- ✅ Admin Dashboard

### 🤖 Chatbot Features (CrownStone Assistant)
- ✅ Property Recommendations
- ✅ Answer FAQs
- ✅ Help with Property Search
- ✅ User Support
- ✅ Smart Responses

---

## 🎨 Design

- **Color Scheme**: Blue (#2563EB), Black (#1F2937), White (#FFFFFF)
- **Typography**: Professional, clean fonts
- **Responsive**: Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
- **Animations**: Smooth transitions and interactions

---

## 🗄️ Database Schema

### Tables
- **users**: User accounts & profiles
- **properties**: Property listings
- **messages**: Contact form submissions
- **favorites**: User favorites/wishlist
- **recently_viewed**: Recently viewed properties
- **newsletter_subscribers**: Newsletter subscribers
- **admin_logs**: Admin activity logs
- **chatbot_conversations**: Chatbot interaction history

---

## 🔌 API Endpoints

### Node.js Express Server

```
GET  /api/properties              - Get all properties
GET  /api/properties/:id          - Get single property
GET  /api/search                  - Search properties
POST /api/chatbot                 - Chatbot interaction
GET  /api/health                  - Server health check
```

### PHP Backend

```
POST /auth.php?action=register    - User registration
POST /auth.php?action=login       - User login
GET  /auth.php?action=logout      - User logout
GET  /properties.php?action=get-all - Get properties
POST /messages.php?action=send    - Send message
POST /favorites.php?action=add    - Add favorite
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1440px

---

## 🔐 Security Features

- ✅ Password Hashing (bcrypt)
- ✅ SQL Injection Prevention
- ✅ XSS Protection
- ✅ CORS Enabled
- ✅ Input Validation & Sanitization
- ✅ Session Management
- ✅ CSRF Protection

---

## 📊 Sample Data

The project includes 10 sample properties in various Lagos neighborhoods:
- Victoria Island
- Lekki Phase 1
- Ikoyi
- Lekki Conservation Centre
- Ajah
- Banana Island
- Shomolu
- Yaba

---

## 🛠️ Setup Instructions

Detailed setup instructions available in `setup/SETUP.md`

---

## 📄 Default Admin Account

**Email**: admin@crownstone.com
**Password**: Admin@123456

⚠️ **Change password after first login!**

---

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and structure.

---

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

## 📄 License

© 2026 CrownStone Real Estate. All rights reserved.

---

**Status**: ✅ Complete & Production Ready
**Last Updated**: July 2026
**Version**: 1.0.0
