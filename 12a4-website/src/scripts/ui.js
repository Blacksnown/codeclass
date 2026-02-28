// This file contains functions related to user interface interactions, such as showing/hiding elements and handling navigation.

document.addEventListener("DOMContentLoaded", function () {
    // Initialize the UI components
    initUI();
});

function initUI() {
    // Set up event listeners for navigation buttons
    const navButtons = document.querySelectorAll("nav button");
    navButtons.forEach(button => {
        button.addEventListener("click", function () {
            const pageId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            showPage(pageId);
        });
    });

    // Initialize the visitor count
    updateVisitorCount();
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll("main .page");
    pages.forEach(page => {
        page.style.display = "none";
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.style.display = "block";
    }
}

function updateVisitorCount() {
    const counterElement = document.getElementById("counter");
    let count = parseInt(localStorage.getItem("visitorCount")) || 0;
    count++;
    localStorage.setItem("visitorCount", count);
    counterElement.textContent = count;
}