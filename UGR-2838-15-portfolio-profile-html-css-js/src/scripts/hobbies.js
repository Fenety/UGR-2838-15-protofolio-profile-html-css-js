document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".logo img");
    
    // Create and add hamburger menu button
    const menuToggle = document.createElement("button");
    menuToggle.innerHTML = "☰";
    menuToggle.classList.add("menu-toggle");
    menuToggle.setAttribute("aria-label", "Toggle navigation menu");
    
    // Insert the menu toggle button before the navbar
    navbar.parentElement.insertBefore(menuToggle, navbar);

    // Toggle menu on button click
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navbar.classList.toggle("active");
        menuToggle.innerHTML = navbar.classList.contains("active") ? "✕" : "☰";
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
            navbar.classList.remove("active");
            menuToggle.innerHTML = "☰";
        }
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navbar.classList.remove("active");
            menuToggle.innerHTML = "☰";
        }
    });

    // Get current page URL
    const currentPage = window.location.pathname.split("/").pop();

    // Add active class to current page link
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
}); 