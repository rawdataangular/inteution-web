// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
    });

    // Products Carousel with Infinite Scroll
    const productsCarousel = document.getElementById('productsCarousel');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let isTransitioning = false;
    const totalSlides = 5;
    const slidesToShow = window.innerWidth <= 768 ? 1 : 3;

    if (productsCarousel && carouselDots.length > 0) {
        // Clone slides for infinite scroll
        const slides = productsCarousel.querySelectorAll('.product-card');
        const firstSlide = slides[0].cloneNode(true);
        const secondSlide = slides[1].cloneNode(true);
        const lastSlide = slides[slides.length - 1].cloneNode(true);
        const secondLastSlide = slides[slides.length - 2].cloneNode(true);

        productsCarousel.appendChild(firstSlide);
        productsCarousel.appendChild(secondSlide);
        productsCarousel.insertBefore(lastSlide, slides[0]);
        productsCarousel.insertBefore(secondLastSlide, slides[0]);

        // Set initial position
        const slideWidth = slides[0].offsetWidth + 32; // width + gap
        productsCarousel.style.transform = `translateX(-${slideWidth * 2}px)`;

        function updateCarousel(slideIndex, smooth = true) {
            if (isTransitioning) return;
            isTransitioning = true;

            const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
            const targetPosition = -(slideWidth * (slideIndex + 2));

            productsCarousel.style.transition = smooth ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
            productsCarousel.style.transform = `translateX(${targetPosition}px)`;

            // Update dots
            carouselDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });

            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }

        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel(currentSlide);
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel(currentSlide);

            // Check if we need to reset position for infinite scroll
            setTimeout(() => {
                const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
                if (currentSlide === 0) {
                    productsCarousel.style.transition = 'none';
                    productsCarousel.style.transform = `translateX(-${slideWidth * 2}px)`;
                    setTimeout(() => {
                        productsCarousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 50);
                }
            }, 600);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel(currentSlide);

            // Check if we need to reset position for infinite scroll
            setTimeout(() => {
                const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
                if (currentSlide === totalSlides - 1) {
                    productsCarousel.style.transition = 'none';
                    const totalCloned = 4;
                    productsCarousel.style.transform = `translateX(-${slideWidth * (totalSlides + 1)}px)`;
                    setTimeout(() => {
                        productsCarousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, 50);
                }
            }, 600);
        }

        // Dot navigation
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Auto-play carousel
        let autoPlayInterval = setInterval(nextSlide, 4000);

        // Pause on hover
        const carouselWrapper = document.querySelector('.products-carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });

            carouselWrapper.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(nextSlide, 4000);
            });
        }

        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        productsCarousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoPlayInterval);
        });

        productsCarousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        productsCarousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }

            autoPlayInterval = setInterval(nextSlide, 4000);
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const slideWidth = productsCarousel.querySelector('.product-card').offsetWidth + 32;
                productsCarousel.style.transition = 'none';
                productsCarousel.style.transform = `translateX(-${slideWidth * (currentSlide + 2)}px)`;
                setTimeout(() => {
                    productsCarousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 50);
            }, 250);
        });
    }
});
    }

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.product-card, .testimonial-card, .customer-logo, .achievement-card, .section-header'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero-home');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }

    // Add smooth reveal animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });

});

