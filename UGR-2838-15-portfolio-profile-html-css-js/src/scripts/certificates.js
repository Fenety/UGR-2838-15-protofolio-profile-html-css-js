document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu
    const navbar = document.querySelector(".navbar");

    // Create and add hamburger menu button
    const menuToggle = document.createElement("button");
    menuToggle.innerHTML = "☰";
    menuToggle.classList.add("menu-toggle");
    // menuToggle.setAttribute("aria-label", "Toggle navigation menu");

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

    const currentPage = window.location.pathname.split("/").pop();

    // Add active class to current page link
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    // Carousel functionality
    const certificatesGrid = document.querySelector('.certificates-grid');
    const cards = document.querySelectorAll('.certificate-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let isCarouselMode = false;
    let isTransitioning = false;

    function updateCarouselMode() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isPhone = window.innerWidth <= 480;
        isCarouselMode = (!isPortrait || !isPhone);
        
        const nav = document.querySelector('.carousel-nav');
        if (nav) {
            nav.style.display = isCarouselMode ? 'flex' : 'none';
        }
    }

    function scrollToCard(index) {
        if (!isCarouselMode || isTransitioning) return;

        isTransitioning = true;

        // Handle circular navigation
        if (index < 0) {
            index = cards.length - 1;
        } else if (index >= cards.length) {
            index = 0;
        }
        
        currentIndex = index;
        
        // Get the exact position of the target card
        const targetPosition = cards[index].offsetLeft;
        
        // Smooth scroll to the target position
        certificatesGrid.scrollTo({
            left: targetPosition,
            behavior: 'smooth'
        });

        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                scrollToCard(currentIndex - 1);
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                scrollToCard(currentIndex + 1);
            }
        });
    }

    // Touch swipe handling
    let touchStartX = 0;
    let touchEndX = 0;

    certificatesGrid.addEventListener('touchstart', (e) => {
        if (!isCarouselMode || isTransitioning) return;
        touchStartX = e.changedTouches[0].screenX;
    });

    certificatesGrid.addEventListener('touchend', (e) => {
        if (!isCarouselMode || isTransitioning) return;
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                scrollToCard(currentIndex + 1);
            } else {
                scrollToCard(currentIndex - 1);
            }
        }
    });

    // Initial setup
    updateCarouselMode();

    // Update on resize and orientation change
    window.addEventListener('resize', updateCarouselMode);
    window.addEventListener('orientationchange', updateCarouselMode);
});
