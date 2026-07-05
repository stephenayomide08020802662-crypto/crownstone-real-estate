// CrownStone Real Estate - Main JavaScript

const API_BASE = 'http://localhost/crownstone-backend';
const NODE_API_BASE = 'http://localhost:5000/api';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    loadFeaturedProperties();
    setupEventListeners();
});

// Check if user is logged in
function checkAuthStatus() {
    const user = localStorage.getItem('user');
    const authElement = document.getElementById('nav-auth');
    
    if (user && authElement) {
        const userData = JSON.parse(user);
        authElement.innerHTML = `
            <span id="user-name">${userData.name}</span>
            <a href="dashboard.html">Dashboard</a> |
            <button onclick="logout()" class="btn-logout">Logout</button>
        `;
    }
}

// Logout user
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = document.getElementById('search-input').value;
            if (searchTerm) {
                window.location.href = `properties.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', submitNewsletter);
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
}

// Load featured properties
async function loadFeaturedProperties() {
    const featuredContainer = document.getElementById('featured-properties');
    if (!featuredContainer) return;

    try {
        const response = await fetch(`${API_BASE}/properties.php?action=get-all&page=1`);
        const data = await response.json();

        if (data.status === 'success') {
            const featured = data.data.properties.filter(p => p.is_featured);
            if (featured.length > 0) {
                featuredContainer.innerHTML = featured.map(property => createPropertyCard(property)).join('');
            } else {
                featuredContainer.innerHTML = '<p>No featured properties available.</p>';
            }
        }
    } catch (error) {
        console.error('Error loading featured properties:', error);
        featuredContainer.innerHTML = '<p>Error loading properties.</p>';
    }
}

// Create property card HTML
function createPropertyCard(property) {
    return `
        <div class="property-card">
            <img src="${property.main_image || 'images/placeholder.jpg'}" alt="${property.title}" class="property-image">
            <div class="property-info">
                <div class="property-price">₦${numberFormat(property.price)}</div>
                <div class="property-location">${property.location}</div>
                <div class="property-details">
                    <div class="property-detail-item">🛏️ ${property.bedrooms}</div>
                    <div class="property-detail-item">🚿 ${property.bathrooms}</div>
                </div>
                <button onclick="viewProperty(${property.id})" class="property-btn">View Details</button>
            </div>
        </div>
    `;
}

// View property details
function viewProperty(propertyId) {
    window.location.href = `property-details.html?id=${propertyId}`;
}

// Submit newsletter
async function submitNewsletter(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch(`${API_BASE}/messages.php?action=newsletter`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        const messageEl = document.getElementById('newsletter-message');
        
        if (data.status === 'success') {
            messageEl.innerHTML = `<div class="message-success">${data.message}</div>`;
            e.target.reset();
        } else {
            messageEl.innerHTML = `<div class="message-error">${data.message}</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Submit contact form
async function submitContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch(`${API_BASE}/messages.php?action=send`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        const messageEl = document.getElementById('contact-message');
        
        if (data.status === 'success') {
            messageEl.innerHTML = `<div class="message-success">${data.message}</div>`;
            e.target.reset();
        } else {
            messageEl.innerHTML = `<div class="message-error">${data.message}</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Format number with commas
function numberFormat(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Get URL parameters
function getUrlParameter(name) {
    const url = new URLSearchParams(window.location.search);
    return url.get(name);
}
