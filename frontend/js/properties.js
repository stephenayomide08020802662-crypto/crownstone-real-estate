// Properties Management JavaScript

const API_BASE = 'http://localhost/crownstone-backend';
const NODE_API_BASE = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.getElementById('filter-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', filterProperties);
        loadProperties();
    }

    // Load single property details if on details page
    const propertyDetails = document.getElementById('property-details');
    if (propertyDetails) {
        const propertyId = getUrlParameter('id');
        if (propertyId) {
            loadPropertyDetails(propertyId);
        }
    }
});

// Load properties
async function loadProperties(page = 1, filters = {}) {
    const propertiesList = document.getElementById('properties-list');
    if (!propertiesList) return;

    propertiesList.innerHTML = '<div class="loading"></div>';

    try {
        let url = `${API_BASE}/properties.php?action=get-all&page=${page}`;
        
        if (filters.location) url += `&location=${encodeURIComponent(filters.location)}`;
        if (filters.type) url += `&type=${encodeURIComponent(filters.type)}`;
        if (filters.min_price) url += `&min_price=${filters.min_price}`;
        if (filters.max_price) url += `&max_price=${filters.max_price}`;
        if (filters.bedrooms) url += `&bedrooms=${filters.bedrooms}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success') {
            propertiesList.innerHTML = data.data.properties.map(property => 
                createPropertyCard(property)
            ).join('');
            
            updatePagination(data.data.pagination);
        } else {
            propertiesList.innerHTML = '<p>No properties found.</p>';
        }
    } catch (error) {
        console.error('Error loading properties:', error);
        propertiesList.innerHTML = '<p>Error loading properties.</p>';
    }
}

// Filter properties
function filterProperties() {
    const filters = {
        location: document.getElementById('filter-location')?.value || '',
        type: document.getElementById('filter-type')?.value || '',
        min_price: document.getElementById('filter-min-price')?.value || '',
        max_price: document.getElementById('filter-max-price')?.value || '',
        bedrooms: document.getElementById('filter-bedrooms')?.value || '0'
    };

    loadProperties(1, filters);
}

// Load single property details
async function loadPropertyDetails(propertyId) {
    const container = document.getElementById('property-details');

    try {
        const response = await fetch(`${API_BASE}/properties.php?action=get-single&id=${propertyId}`);
        const data = await response.json();

        if (data.status === 'success') {
            const property = data.data.property;
            container.innerHTML = `
                <div class="property-details-wrapper">
                    <div class="property-gallery">
                        <img src="${property.main_image || 'images/placeholder.jpg'}" alt="${property.title}" class="main-image">
                    </div>
                    <div class="property-info-details">
                        <h1>${property.title}</h1>
                        <div class="property-price-large">₦${numberFormat(property.price)}</div>
                        <p class="property-location-large">${property.location}</p>
                        
                        <div class="property-features">
                            <div class="feature">
                                <span>🛏️ Bedrooms:</span>
                                <strong>${property.bedrooms}</strong>
                            </div>
                            <div class="feature">
                                <span>🚿 Bathrooms:</span>
                                <strong>${property.bathrooms}</strong>
                            </div>
                            <div class="feature">
                                <span>📐 Area:</span>
                                <strong>${property.square_feet} sq ft</strong>
                            </div>
                            <div class="feature">
                                <span>🏠 Type:</span>
                                <strong>${property.property_type}</strong>
                            </div>
                        </div>

                        <h3>Description</h3>
                        <p>${property.description}</p>

                        <h3>Agent Information</h3>
                        <p><strong>${property.agent_name}</strong></p>
                        <p>📞 ${property.agent_phone}</p>
                        <p>✉️ ${property.agent_email}</p>

                        <button onclick="contactAgent(${propertyId})" class="btn-primary">Contact Agent</button>
                        <button onclick="toggleFavorite(${propertyId})" class="favorite-btn">❤️ Add to Favorites</button>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading property details:', error);
        container.innerHTML = '<p>Error loading property details.</p>';
    }
}

// Create property card
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

// Update pagination
function updatePagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    let html = '';
    for (let i = 1; i <= pagination.total_pages; i++) {
        html += `<a href="#" onclick="loadProperties(${i})" class="${i === pagination.current_page ? 'active' : ''}">${i}</a>`;
    }
    
    paginationEl.innerHTML = html;
}

// Contact agent
function contactAgent(propertyId) {
    const user = localStorage.getItem('user');
    if (!user) {
        alert('Please login to contact an agent.');
        window.location.href = 'login.html';
        return;
    }
    window.location.href = `contact.html?property_id=${propertyId}`;
}

// Toggle favorite
async function toggleFavorite(propertyId) {
    const user = localStorage.getItem('user');
    if (!user) {
        alert('Please login to add favorites.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/favorites.php?action=add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `property_id=${propertyId}`
        });
        
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error('Error adding to favorites:', error);
    }
}

// Number formatting
function numberFormat(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Get URL parameters
function getUrlParameter(name) {
    const url = new URLSearchParams(window.location.search);
    return url.get(name);
}

function viewProperty(propertyId) {
    window.location.href = `property-details.html?id=${propertyId}`;
}
