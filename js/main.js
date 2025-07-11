// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initInteractiveElements();
    initAnimations();
    initFormHandling();
    initAccessibility();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Track mobile menu usage
            trackEvent('mobile_menu_toggled');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Interactive elements
function initInteractiveElements() {
    // Dashboard tabs interaction
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Track tab interaction
            trackEvent('dashboard_tab_clicked', {
                tab_name: this.textContent.trim()
            });
        });
    });
    
    // Feature cards interaction
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn-outline')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-outline')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Track element visibility
                const elementType = entry.target.classList.contains('feature-card') ? 'feature_card' :
                                  entry.target.classList.contains('hero') ? 'hero_section' :
                                  'other_element';
                trackEvent('element_visible', { element_type: elementType });
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .hero, .cta-section').forEach(el => {
        observer.observe(el);
    });
    
    // Animated counter for stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const isNumber = finalValue.includes('K') || finalValue.includes('+');
        
        let startValue = 0;
        let endValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        if (isPercentage) {
            endValue = parseInt(finalValue);
        } else if (isNumber) {
            endValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        }
        
        const duration = 2000;
        const increment = endValue / (duration / 16);
        let currentValue = 0;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= endValue) {
                currentValue = endValue;
                clearInterval(counter);
            }
            
            if (isPercentage) {
                stat.textContent = Math.floor(currentValue) + '%';
            } else if (isNumber) {
                stat.textContent = Math.floor(currentValue) + 'K+';
            } else {
                stat.textContent = Math.floor(currentValue);
            }
        }, 16);
    });
}

// Form handling
function initFormHandling() {
    // Contact form handling (if exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Track form submission
            trackEvent('contact_form_submitted', {
                form_type: 'contact',
                has_name: !!data.name,
                has_email: !!data.email
            });
            
            // Simulate form submission
            showNotification('Thank you! Your message has been sent.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter signup (if exists)
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // Track newsletter signup
            trackEvent('newsletter_signup', {
                email_provided: !!email
            });
            
            showNotification('Thanks for subscribing!', 'success');
            this.reset();
        });
    }
}

// Accessibility features
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Keyboard navigation for interactive elements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.getElementById('nav-toggle').classList.remove('active');
            }
        }
    });
    
    // Focus management
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('page_load_time', {
            load_time_ms: loadTime
        });
    });
    
    // Track user engagement
    let startTime = Date.now();
    let isActive = true;
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            isActive = false;
            const sessionTime = Date.now() - startTime;
            trackEvent('session_duration', {
                duration_ms: sessionTime
            });
        } else {
            isActive = true;
            startTime = Date.now();
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring(); 