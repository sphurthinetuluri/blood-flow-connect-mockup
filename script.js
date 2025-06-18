
// Global state
let currentUser = {
    name: '',
    role: '',
    bloodType: '',
    phone: '',
    location: ''
};

let currentView = 'auth';

// DOM elements
const authContainer = document.getElementById('auth-container');
const donorDashboard = document.getElementById('donor-dashboard');
const recipientDashboard = document.getElementById('recipient-dashboard');
const authForm = document.getElementById('auth-form');
const emergencyModal = document.getElementById('emergency-modal');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    showView('auth');
});

function setupEventListeners() {
    // Role selection
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectRole(this.dataset.role);
        });
    });

    // Auth form submission
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Emergency form submission
    document.getElementById('emergency-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleEmergencyRequest();
    });

    // Response buttons
    document.querySelectorAll('.btn-respond').forEach(btn => {
        btn.addEventListener('click', function() {
            handleResponseClick();
        });
    });

    // Contact buttons
    document.querySelectorAll('.btn-contact').forEach(btn => {
        btn.addEventListener('click', function() {
            handleContactClick();
        });
    });

    // View map buttons
    document.querySelectorAll('.btn-outline').forEach(btn => {
        if (btn.textContent.includes('Map') || btn.textContent.includes('View All')) {
            btn.addEventListener('click', function() {
                showAlert('Map view would open here in the full app!');
            });
        }
    });
}

function selectRole(role) {
    // Update button states
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.querySelector(`[data-role="${role}"]`).classList.add('selected');
    
    // Store role and show form
    currentUser.role = role;
    authForm.style.display = 'block';
    
    // Animate form appearance
    authForm.style.opacity = '0';
    setTimeout(() => {
        authForm.style.opacity = '1';
    }, 100);
}

function handleLogin() {
    // Get form data
    const formData = new FormData(authForm);
    currentUser.name = document.getElementById('name').value;
    currentUser.phone = document.getElementById('phone').value;
    currentUser.bloodType = document.getElementById('bloodType').value;
    currentUser.location = document.getElementById('location').value;

    // Validate required fields
    if (!currentUser.name || !currentUser.phone || !currentUser.bloodType || !currentUser.location) {
        showAlert('Please fill in all required fields.');
        return;
    }

    // Show success message
    showAlert(`Welcome ${currentUser.name}! Redirecting to your dashboard...`);

    // Redirect to appropriate dashboard
    setTimeout(() => {
        if (currentUser.role === 'donor') {
            showDonorDashboard();
        } else {
            showRecipientDashboard();
        }
    }, 1500);
}

function showDonorDashboard() {
    showView('donor');
    
    // Update dashboard with user data
    document.getElementById('user-initials').textContent = getInitials(currentUser.name);
    document.getElementById('welcome-text').textContent = `Welcome, ${currentUser.name}`;
    document.getElementById('blood-type-badge').textContent = `${currentUser.bloodType} Donor`;
}

function showRecipientDashboard() {
    showView('recipient');
    
    // Update dashboard with user data
    document.getElementById('recipient-initials').textContent = getInitials(currentUser.name);
    document.getElementById('recipient-welcome-text').textContent = `Welcome, ${currentUser.name}`;
    document.getElementById('recipient-blood-type-badge').textContent = `${currentUser.bloodType} Patient`;
    
    // Set emergency form blood type
    document.getElementById('emergency-blood-type').value = currentUser.bloodType;
}

function showView(view) {
    // Hide all views
    authContainer.style.display = 'none';
    donorDashboard.style.display = 'none';
    recipientDashboard.style.display = 'none';
    
    // Show selected view
    currentView = view;
    switch(view) {
        case 'auth':
            authContainer.style.display = 'block';
            break;
        case 'donor':
            donorDashboard.style.display = 'block';
            break;
        case 'recipient':
            recipientDashboard.style.display = 'block';
            break;
    }
}

function showEmergencyRequest() {
    emergencyModal.style.display = 'flex';
    // Add animation
    const modalContent = emergencyModal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
        modalContent.style.transition = 'all 0.3s ease';
    }, 10);
}

function hideEmergencyRequest() {
    const modalContent = emergencyModal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        emergencyModal.style.display = 'none';
    }, 300);
}

function handleEmergencyRequest() {
    const bloodType = document.getElementById('emergency-blood-type').value;
    const units = document.getElementById('units').value;
    const hospital = document.getElementById('hospital').value;
    const notes = document.getElementById('notes').value;

    // Simulate sending emergency request
    showAlert(`🚨 Emergency request sent!\n\nBlood Type: ${bloodType}\nUnits: ${units}\nLocation: ${hospital}\n\nNearby donors have been notified.`);
    
    hideEmergencyRequest();
    
    // Clear form
    document.getElementById('emergency-form').reset();
    document.getElementById('emergency-blood-type').value = currentUser.bloodType;
}

function handleResponseClick() {
    showAlert('🎉 Thank you for responding!\n\nYour response has been sent to the hospital. They will contact you shortly with pickup details.');
}

function handleContactClick() {
    showAlert('📞 Contact initiated!\n\nThe donor has been notified of your request. You should receive a call within 10 minutes.');
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function showAlert(message) {
    alert(message);
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        if (currentView === 'donor') {
            // Update notification count occasionally
            const notificationCount = document.querySelector('.notification-count');
            if (notificationCount && Math.random() < 0.1) {
                const currentCount = parseInt(notificationCount.textContent);
                notificationCount.textContent = currentCount + 1;
            }
        }
    }, 10000); // Every 10 seconds
}

// Start real-time updates simulation
simulateRealTimeUpdates();

// Handle modal clicks outside content
emergencyModal.addEventListener('click', function(e) {
    if (e.target === emergencyModal) {
        hideEmergencyRequest();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape' && emergencyModal.style.display === 'flex') {
        hideEmergencyRequest();
    }
    
    // Enter key on emergency button shows modal (for recipients)
    if (e.key === 'Enter' && currentView === 'recipient' && document.activeElement.classList.contains('emergency-btn')) {
        showEmergencyRequest();
    }
});

// Add some sample data updates for demonstration
function updateSampleData() {
    // Update request times occasionally
    const timeElements = document.querySelectorAll('.request-meta');
    timeElements.forEach(element => {
        if (element.textContent.includes('min ago')) {
            const currentTime = parseInt(element.textContent.match(/\d+/)[0]);
            if (Math.random() < 0.3) {
                element.textContent = element.textContent.replace(/\d+/, currentTime + 1);
            }
        }
    });
}

setInterval(updateSampleData, 30000); // Every 30 seconds

// Add loading states for buttons
function addLoadingState(button, duration = 2000) {
    const originalText = button.textContent;
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, duration);
}

// Enhanced button interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-respond') || 
        e.target.classList.contains('btn-contact') ||
        e.target.classList.contains('btn-emergency')) {
        addLoadingState(e.target, 1500);
    }
});
