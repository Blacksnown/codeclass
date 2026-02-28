// Main JavaScript file for the 12A4 website

// Function to initialize the website
function init() {
    // Set up event listeners
    setupNavigation();
    updateVisitorCount();
}

// Function to set up navigation
function setupNavigation() {
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            showPage(pageId);
        });
    });
}

// Function to show a specific page
function showPage(pageId) {
    const pages = document.querySelectorAll('main .page');
    pages.forEach(page => {
        page.style.display = 'none'; // Hide all pages
    });
    document.getElementById(pageId).style.display = 'block'; // Show the selected page
}

// Function to update visitor count
function updateVisitorCount() {
    const counterElement = document.getElementById('counter');
    let count = parseInt(localStorage.getItem('visitorCount')) || 0;
    count++;
    localStorage.setItem('visitorCount', count);
    counterElement.textContent = count;
}

// Initialize the website when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);