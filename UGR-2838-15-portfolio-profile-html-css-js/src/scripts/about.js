// Responsive JavaScript for the About Me page

document.addEventListener("DOMContentLoaded", () => {
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
        e.stopPropagation(); // Prevent click from bubbling to document
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

    // Handle link hover effects
    const navbarLinks = document.querySelectorAll(".navbar a");
    navbarLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#FFC107";
        });

        link.addEventListener("mouseout", () => {
            link.style.color = "#fff";
        });
    });

    // Adjust logo size on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            logo.style.width = "40px";
        } else {
            logo.style.width = "50px";
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
  