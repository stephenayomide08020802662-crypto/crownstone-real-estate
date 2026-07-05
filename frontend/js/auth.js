// Authentication JavaScript

const API_BASE = 'http://localhost/crownstone-backend';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// Handle login
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('login-message');

    try {
        const response = await fetch(`${API_BASE}/auth.php?action=login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await response.json();

        if (data.status === 'success') {
            localStorage.setItem('user', JSON.stringify({
                id: data.data.user_id,
                name: email,
                is_admin: data.data.is_admin
            }));
            
            messageEl.innerHTML = '<div class="message-success">Login successful! Redirecting...</div>';
            setTimeout(() => {
                window.location.href = data.data.is_admin ? 'admin/admin-dashboard.html' : 'dashboard.html';
            }, 1000);
        } else {
            messageEl.innerHTML = `<div class="message-error">${data.message}</div>`;
        }
    } catch (error) {
        messageEl.innerHTML = '<div class="message-error">Error during login. Please try again.</div>';
        console.error('Login error:', error);
    }
}

// Handle registration
async function handleRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const messageEl = document.getElementById('register-message');

    try {
        const response = await fetch(`${API_BASE}/auth.php?action=register`, {
            method: 'POST',
            body: new URLSearchParams(formData)
        });

        const data = await response.json();

        if (data.status === 'success') {
            localStorage.setItem('user', JSON.stringify({
                id: data.data.user_id,
                name: formData.get('name')
            }));
            
            messageEl.innerHTML = '<div class="message-success">Registration successful! Redirecting...</div>';
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            messageEl.innerHTML = `<div class="message-error">${data.message}</div>`;
        }
    } catch (error) {
        messageEl.innerHTML = '<div class="message-error">Error during registration. Please try again.</div>';
        console.error('Registration error:', error);
    }
}
