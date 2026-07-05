# 🚀 CrownStone Real Estate - Setup Instructions

## Prerequisites

1. **XAMPP** (PHP 7.4+, MySQL 5.7+)
2. **Node.js** (v14+)
3. **npm** (comes with Node.js)
4. **Git** (optional)

---

## Step 1: Database Setup

### 1.1 Start MySQL
- Open XAMPP Control Panel
- Click "Start" next to MySQL

### 1.2 Create Database
```bash
# Open phpMyAdmin: http://localhost/phpmyadmin
# Or use MySQL command:
mysql -u root -p
CREATE DATABASE crownstone_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE crownstone_db;
```

### 1.3 Import Schema
- In phpMyAdmin, import `database/schema.sql`
- Then import `database/sample-data.sql`

---

## Step 2: Backend Setup

### 2.1 Copy Files
```bash
cp -r backend/ C:\xampp\htdocs\crownstone-backend
```

### 2.2 Update Configuration
- Edit `backend/config.php`
- Update database credentials if needed

### 2.3 Access
```
http://localhost/crownstone-backend/
```

---

## Step 3: Frontend Setup

### 3.1 Copy Files
```bash
cp -r frontend/ C:\xampp\htdocs\crownstone
```

### 3.2 Update API URLs
- Edit `frontend/js/main.js`
- Ensure API endpoints match your setup

### 3.3 Access
```
http://localhost/crownstone/
```

---

## Step 4: Node.js API Server

### 4.1 Navigate
```bash
cd node-server
```

### 4.2 Install Dependencies
```bash
npm install
```

### 4.3 Configure .env
- Update database credentials in `.env`
- Ensure port 5000 is available

### 4.4 Start Server
```bash
npm run dev    # Development with nodemon
npm start      # Production
```

Server: `http://localhost:5000`

---

## Step 5: Verify Setup

1. **PHP Backend**: `http://localhost/crownstone-backend/`
2. **Frontend**: `http://localhost/crownstone/`
3. **Node.js API**: `http://localhost:5000/api/health`
4. **Database**: `http://localhost/phpmyadmin`

---

## Default Admin Account

**Email**: admin@crownstone.com
**Password**: Admin@123456

⚠️ **Change password after first login!**

---

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running in XAMPP
- Check credentials in `config.php`
- Verify database exists

### Node.js Module Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5000 Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
- Verify CORS headers are set in PHP
- Check API URLs in frontend
- Ensure Node.js has CORS enabled

---

**Setup Complete!** 🎉
